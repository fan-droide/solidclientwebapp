/* https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/getting-started/ */
import {
    getSolidDataset
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";

const SOLID_IDENTITY_PROVIDER = "https://warm-inlet-30289.herokuapp.com/audio/"

//const SOLID_IDENTITY_PROVIDER = "http://localhost:3000/demopod1/";

async function init() {
    let myReadingList;

    try {

        myReadingList = await getSolidDataset(SOLID_IDENTITY_PROVIDER, { fetch: fetch });
        console.log(myReadingList)

    } catch (error) {
        if (typeof error.statusCode === "number" && error.statusCode === 404) {
            console.error(error);
        } else {
            console.error(error.message);
        }
    }
}

init()