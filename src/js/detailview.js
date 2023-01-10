import {
    getSolidDataset,
    getContainedResourceUrlAll    
} from "@inrupt/solid-client"
import { fetch, getDefaultSession} from "@inrupt/solid-client-authn-browser"
import { RDF } from "@inrupt/vocab-common-rdf"

const SOLID_IDENTITY_PROVIDER = "http://localhost:3000"

async function init() {    
    let queryString = window.location.search
    queryString = queryString.split('path=')[1]
    let thePath =queryString
    let sessionParam = queryString
    sessionParam = sessionParam.split('session=')[1]
    if(sessionParam){
        thePath = queryString.slice(0, queryString.indexOf('&'))
    }    
    
    const session = getDefaultSession()
    
    //const theSession = await session.clientAuthentication.validateCurrentSession(sessionParam)   

    let myReadingList

    try {

        myReadingList = await getSolidDataset(SOLID_IDENTITY_PROVIDER + "/" + thePath + "/", { fetch: session.fetch })

        let items = getContainedResourceUrlAll(myReadingList, { fetch: session.fetch })

        for (let i = 0; i < items.length; i++) {

            let item = items[i]
            console.log(item)
            if (item !== null) {

                if (isAudioType(item)) {
                    paintPlayer(item)
                }
            }
        }

    } catch (error) {
        if (typeof error.statusCode === "number" && error.statusCode === 404) {
            console.error(error)
        } else {
            console.error(error.message)
        }
    }
}

function isAudioType(file) {
    return /\.(mp3|m4a)$/i.test(file)
}

function paintPlayer(url) {
    document.getElementById('song').innerHTML = '<audio controls="controls" src="' + url + '">'

}
init()
