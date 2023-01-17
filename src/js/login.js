/* SOURCE: https://solidproject.org/developers/tutorials/first-app */
import {SOLID_IDENTITY_PROVIDER} from './config.js'
import { Session, getDefaultSession, onSessionRestore } from '@inrupt/solid-client-authn-browser'

// If your Pod is *not* on `solidcommunity.net`, change this to your identity provider.
document.getElementById(
    'solid_identity_provider'
).innerHTML = `[<a target='_blank' href='${SOLID_IDENTITY_PROVIDER}'>${SOLID_IDENTITY_PROVIDER}</a>]`

const session =  new Session()

const buttonLogin = document.getElementById('btnLogin')

// 1a. Start Login Process. Call session.login() function.
async function login() {
    if (!session.info.isLoggedIn) {
        // For other login() options:
        // https://docs.inrupt.com/developer-tools/api/javascript/solid-client-authn-browser/interfaces/ILoginInputOptions.html
        // await session.login({
        //     oidcIssuer: SOLID_IDENTITY_PROVIDER,
        //     clientName: 'Inrupt tutorial client app',
        //     redirectUrl: window.location.href
        // })
        // Use Client ID: https://solidproject.org/TR/oidc#clientids-document
        await session.login({
            oidcIssuer: SOLID_IDENTITY_PROVIDER,
            clientId: 'http://localhost:1234/myappid.jsonld',
            redirectUrl: window.location.href
        })
    }
}

// 1b. Login Redirect. Call session.handleIncomingRedirect() function.
// When redirected after login, finish the process by retrieving session information.
async function handleRedirectAfterLogin() {    
    await session.handleIncomingRedirect({
        restorePreviousSession: false
      })
    if (session.info.isLoggedIn) {       
        // Update the page with the status.
        document.getElementById(
            'labelStatus'
        ).innerHTML = `Your session is logged in with the WebID [<a target='_blank' href='${session.info.webId}'>${session.info.webId}</a>].`
        document.getElementById('labelStatus').setAttribute('role', 'alert')       
    }
}

// The example has the login redirect back to the index.html.
// This calls the function to process login information.
// If the function is called when not part of the login redirect, the function is a no-op.
handleRedirectAfterLogin()
onSessionRestore((url)=>{    
    const linksRscrs = document.getElementsByClassName('linkResource');        
    for (let link of linksRscrs){
        let hrefIs = link.getAttribute('href')        
        hrefIs += '&session=' + session.info.sessionId
        link.setAttribute('href', hrefIs)
    }
})
buttonLogin.onclick = function () {
    login()
}
