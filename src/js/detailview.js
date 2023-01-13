import { Session, getDefaultSession} from "@inrupt/solid-client-authn-browser"

async function init() {
       
    const session = getDefaultSession()    
    const searchParams = new URLSearchParams(document.location.search)
    const sessionParam = searchParams.get('sessionId')
    const theSessionInfo = await session.clientAuthentication.validateCurrentSession(sessionParam)
    const newsession = new Session(session, sessionParam)
    console.log(newsession)    
    console.log(theSessionInfo)
    if (session.info.isLoggedIn) {       
        // Update the page with the status.
        document.getElementById(
            'labelStatus'
        ).innerHTML = `[<a target='_blank' href='${session.info.webId}'>${session.info.webId}</a>].`
        document.getElementById('labelStatus').setAttribute('role', 'alert')       
    }   
     
}

init()
