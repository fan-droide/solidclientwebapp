import { Session, getDefaultSession, onSessionRestore } from '@inrupt/solid-client-authn-browser'

const SOLID_IDENTITY_PROVIDER = 'https://login.inrupt.com'
document.getElementById(
    'solid_identity_provider'
).innerHTML = `[<a target='_blank' href='${SOLID_IDENTITY_PROVIDER}'>${SOLID_IDENTITY_PROVIDER}</a>]`

const session = getDefaultSession()

const buttonLogin = document.getElementById('btnLogin')
buttonLogin.onclick = function () {
    login()
}

async function login() {
    if (!session.info.isLoggedIn) {
        await session.login({
            oidcIssuer: SOLID_IDENTITY_PROVIDER,
            clientName: 'Inrupt tutorial client app',
            //redirectUrl: window.location+'detailview.html'
        })
    }
}

async function handleRedirectAfterLogin() {    
    await session.handleIncomingRedirect({
        restorePreviousSession: true, 
        //url:window.location+'detailview.html'
    })
    if (session.info.isLoggedIn) {        
        console.log(session)     
        document.getElementById(
            'labelStatus'
        ).innerHTML = `Your session is logged in with the WebID [<a target='_blank' href='${session.info.webId}'>${session.info.webId}</a>].`
        document.getElementById('labelStatus').setAttribute('role', 'alert')       
    }
}

onSessionRestore(async (url)=>{
    console.log(session)   
})
handleRedirectAfterLogin()


