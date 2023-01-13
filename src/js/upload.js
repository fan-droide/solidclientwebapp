//import {session} from './login.js'
import {SOLID_IDENTITY_PROVIDER, RESOURCE} from './config.js'
const form = document.forms.namedItem('fileinfo')
form.addEventListener(
    'submit',
    async (event) => {
        event.preventDefault()

        /* THIS PIECE OF CODE RETRIEVES THE ID AND SECRET FROM SESSION
        BUT IT DOES NOT WORK TO REQUEST RESOURCES THROWS UNAUTHORIZED */
        /*
        let id 
        let secret 
        if (session.info.isLoggedIn) {            
            const sessionInfo = await session.clientAuthentication.getSessionInfo(session.info.sessionId)            
            id = sessionInfo.clientAppId
            secret = sessionInfo.clientAppSecret
        } */
        const inputName = form.elements['uname']
        const inputPass = form.elements['psw']
        
        // ONLY FOR LOCALHOST APPARENTLY
        const first_response = await fetch(SOLID_IDENTITY_PROVIDER+'idp/credentials/', {       
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // The email/password fields are those of your account.
            // The name field will be used when generating the ID of your token.
            body: JSON.stringify({ email: inputName.value, password: inputPass.value, name: 'my-token' }),
        })
    
        // These are the identifier and secret of your token.
        // Store the secret somewhere safe as there is no way to request it again from the server!
        const { id, secret } = await first_response.json()
     
        const formData = new FormData(form)
        formData.append('folder', 'newfolder')
        formData.append('clientId', id)
        formData.append('clientSecret', secret)
        formData.append('issuer', SOLID_IDENTITY_PROVIDER)
        formData.append('resource', RESOURCE)
        const request = new XMLHttpRequest()
        request.open('POST', 'http://127.0.0.1:7000/upload-file', true)
        request.onload = (progress) => {
            console.log(request.status)
        }
        request.send(formData)        
    },
    false
)

