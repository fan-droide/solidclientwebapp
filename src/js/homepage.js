/* https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/getting-started/ */

import {
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  getUrl
} from "@inrupt/solid-client"
import { fetch } from "@inrupt/solid-client-authn-browser"
import { SCHEMA_INRUPT, RDF, AS } from "@inrupt/vocab-common-rdf"
const SOLID_IDENTITY_PROVIDER = "https://warm-inlet-30289.herokuapp.com/"

async function init() {
  let myReadingList

  try {

    myReadingList = await getSolidDataset(SOLID_IDENTITY_PROVIDER, { fetch: fetch })
    console.log(myReadingList)
    let items = getThingAll(myReadingList)

    let listcontent = []
    for (let i = 0; i < items.length; i++) {
      //let item = getStringNoLocale(items[i], SCHEMA_INRUPT.name)
      let item = getUrl(items[i], RDF.type)
      if (item !== null) {
        if (item === "http://www.w3.org/ns/ldp#Container") {
          let cosica = getThing(myReadingList, items[i].url)
          // check is not hidden folder
          if (cosica.url.indexOf("/.") === -1) {
            const subPath = cosica.url.split('/').slice(3)[0]
            listcontent.push(subPath)
          }
        }
      }
    }
    paintList(listcontent)

  } catch (error) {
    if (typeof error.statusCode === "number" && error.statusCode === 404) {
      console.error(error)
    } else {
      console.error(error.message)
    }
  }
}

function paintList(listcontent) {

  const myUl = document.getElementById("my-ul")

  for (let topping of listcontent) {
    const newLi = document.createElement("li")
    const newAnchor = document.createElement("a")
    newAnchor.href = 'detailview.html' + "?path=" + topping
    newAnchor.textContent = topping
    newLi.appendChild(newAnchor)
    myUl.appendChild(newLi)
  }
}

init()