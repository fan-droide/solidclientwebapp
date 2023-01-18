/* https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/getting-started/ */
//import {SOLID_IDENTITY_PROVIDER} from './config.js'
import { getDefaultSession, onSessionRestore } from '@inrupt/solid-client-authn-browser'

import {
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  getUrl
} from "@inrupt/solid-client"
import { fetch } from "@inrupt/solid-client-authn-browser"
import { SCHEMA_INRUPT, RDF, AS } from "@inrupt/vocab-common-rdf"

const session = getDefaultSession()

async function init() { 
  
  const webId = session.info.webId
  const address = webId.split('/')
  const issuer = address[0] + '//' + address[1] + '/' + address[2]  
  let myReadingList

  try {
    // INRUPT: 'https://storage.inrupt.com/.../'
    myReadingList = await getSolidDataset(issuer, { fetch: fetch })
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
    newAnchor.classList.add("linkResource")
    newAnchor.href = 'detailview.html' + "?path=" + topping
    newAnchor.textContent = topping
    newLi.appendChild(newAnchor)
    myUl.appendChild(newLi)
  }
}

onSessionRestore((url)=>{    
  init()
})