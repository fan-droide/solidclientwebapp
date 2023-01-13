/* SOURCE: https://solidproject.org/developers/tutorials/first-app */
import { Session, getDefaultSession, onSessionRestore } from '@inrupt/solid-client-authn-browser'

// If your Pod is *not* on `solidcommunity.net`, change this to your identity provider.
const SOLID_IDENTITY_PROVIDER = 'https://solidcommunity.net'
document.getElementById(
    'solid_identity_provider'
).innerHTML = `[<a target='_blank' href='${SOLID_IDENTITY_PROVIDER}'>${SOLID_IDENTITY_PROVIDER}</a>]`

//const session =  new Session()
const session = getDefaultSession()

const buttonLogin = document.getElementById('btnLogin')
buttonLogin.onclick = function () {
    login()
}

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
    await session.handleIncomingRedirect({
        restorePreviousSession: true
      })
    if (session.info.isLoggedIn) {        
        // Update the page with the status.
        document.getElementById(
            'labelStatus'
        ).innerHTML = `Your session is logged in with the WebID [<a target='_blank' href='${session.info.webId}'>${session.info.webId}</a>].`
        document.getElementById('labelStatus').setAttribute('role', 'alert')       
    }
}

onSessionRestore(async (url)=>{
    const theSessionInfo = await session.clientAuthentication.getSessionInfo(session.info.sessionId)
    console.log(theSessionInfo)
    const link2Page = document.getElementById('linkToPage')
    link2Page.href += '?sessionId=' + session.info.sessionId   
})
// The example has the login redirect back to the index.html.
// This calls the function to process login information.
// If the function is called when not part of the login redirect, the function is a no-op.
handleRedirectAfterLogin()


