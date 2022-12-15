/* SOURCE: https://solidproject.org/developers/tutorials/first-app */
import { Session } from '@inrupt/solid-client-authn-browser'

// If your Pod is *not* on `solidcommunity.net`, change this to your identity provider.
const SOLID_IDENTITY_PROVIDER = 'https://solidcommunity.net'
document.getElementById(
    'solid_identity_provider'
).innerHTML = `[<a target='_blank' href='${SOLID_IDENTITY_PROVIDER}'>${SOLID_IDENTITY_PROVIDER}</a>]`

const NOT_ENTERED_WEBID =
    '...not logged in yet - but enter any WebID to read from its profile...'

const session = new Session()

const buttonLogin = document.getElementById('btnLogin')

// 1a. Start Login Process. Call session.login() function.
async function login() {
    if (!session.info.isLoggedIn) {
        await session.login({
            oidcIssuer: SOLID_IDENTITY_PROVIDER,
            clientName: 'Inrupt tutorial client app',
            redirectUrl: window.location.href
        })
    }
}

// 1b. Login Redirect. Call session.handleIncomingRedirect() function.
// When redirected after login, finish the process by retrieving session information.
async function handleRedirectAfterLogin() {
    await session.handleIncomingRedirect(window.location.href)
    if (session.info.isLoggedIn) {
        // Update the page with the status.
        document.getElementById(
            'labelStatus'
        ).innerHTML = `Your session is logged in with the WebID [<a target='_blank' href='${session.info.webId}'>${session.info.webId}</a>].`
        document.getElementById('labelStatus').setAttribute('role', 'alert')
        console.log(session.info.webId)
    }
}

// The example has the login redirect back to the index.html.
// This calls the function to process login information.
// If the function is called when not part of the login redirect, the function is a no-op.
handleRedirectAfterLogin()

buttonLogin.onclick = function () {
    login()
}
