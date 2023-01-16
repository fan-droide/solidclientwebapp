import { Session, getDefaultSession} from "@inrupt/solid-client-authn-browser"

async function init() {
   
    const session = getDefaultSession()    
    console.log(session)  
  
    if (session.info.isLoggedIn) {               
        document.getElementById(
            'labelStatus'
        ).innerHTML = `[<a target='_blank' href='${session.info.webId}'>${session.info.webId}</a>].`
        document.getElementById('labelStatus').setAttribute('role', 'alert')       
    }   
     
}

init()
