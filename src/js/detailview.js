import { getDefaultSession} from "@inrupt/solid-client-authn-browser"

async function init() {

    //const theSession = await session.clientAuthentication.validateCurrentSession(sessionParam)   
    const session = getDefaultSession()
    console.log(session)    
    if (session.info.isLoggedIn) {       
        // Update the page with the status.
        document.getElementById(
            'labelStatus'
        ).innerHTML = `[<a target='_blank' href='${session.info.webId}'>${session.info.webId}</a>].`
        document.getElementById('labelStatus').setAttribute('role', 'alert')       
    }   
     
}

init()
