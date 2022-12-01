import {
    getSolidDataset,
    getThing,
    getThingAll,
    getUrl
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { RDF } from "@inrupt/vocab-common-rdf";

const SOLID_IDENTITY_PROVIDER = "https://warm-inlet-30289.herokuapp.com"

async function init() {
    let queryString = window.location.search
    queryString = queryString.split('path=')[1]
    let myReadingList;

    try {

        myReadingList = await getSolidDataset(SOLID_IDENTITY_PROVIDER + "/" + queryString + "/", { fetch: fetch });
        let items = getThingAll(myReadingList)
        console.log(myReadingList)

        for (let i = 0; i < items.length; i++) {

            let item = getUrl(items[i], RDF.type)

            if (item !== null) {
                if (item === "http://www.w3.org/ns/ldp#Resource") {

                    let cosica = getThing(myReadingList, items[i].url)
                    if (isAudioType(cosica.url)) {
                        paintPlayer(cosica.url)
                    }
                }
            }
        }


    } catch (error) {
        if (typeof error.statusCode === "number" && error.statusCode === 404) {
            console.error(error);
        } else {
            console.error(error.message);
        }
    }
}

function isAudioType(file) {
    return /\.(mp3|m4a)$/i.test(file);
}

function paintPlayer(url) {
    document.getElementById('song').innerHTML = '<audio controls="controls" src="' + url + '">';

}
init() 
