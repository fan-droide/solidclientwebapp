/* https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/getting-started/ */
import {
    getSolidDataset,
    getThingAll,
    getStringNoLocale
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";

const SOLID_IDENTITY_PROVIDER = "https://warm-inlet-30289.herokuapp.com/audio/"

async function init() {
    let myReadingList;

    try {

        myReadingList = await getSolidDataset(SOLID_IDENTITY_PROVIDER, { fetch: fetch });
        console.log(myReadingList)
        let items = getThingAll(myReadingList)
        console.log(items)
        let listcontent = ""
        for (let i = 0; i < items.length; i++) {
            let item = getStringNoLocale(items[i], SCHEMA_INRUPT.name)
            console.log(item)
            if (item !== null) {
                listcontent += item + "\n"
            }
        }
        console.log(listcontent)

    } catch (error) {
        if (typeof error.statusCode === "number" && error.statusCode === 404) {
            console.error(error);
        } else {
            console.error(error.message);
        }
    }
}

init()