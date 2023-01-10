import {
    getSolidDataset,
    getContainedResourceUrlAll    
} from "@inrupt/solid-client"
import { fetch } from "@inrupt/solid-client-authn-browser"
import { RDF } from "@inrupt/vocab-common-rdf"

const SOLID_IDENTITY_PROVIDER = "http://localhost:3000"

async function init() {
    let queryString = window.location.search
    queryString = queryString.split('path=')[1]
    let myReadingList

    try {

        myReadingList = await getSolidDataset(SOLID_IDENTITY_PROVIDER + "/" + queryString + "/", { fetch: fetch })

        let items = getContainedResourceUrlAll(myReadingList, { fetch: fetch })

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
