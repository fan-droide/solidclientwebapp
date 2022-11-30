// ... import statement for authentication, which includes the fetch function, is omitted for brevity.

/*import { universalAccess } from "@inrupt/solid-client";


console.log('Hello world!'); */

import {
    getSolidDataset,
    getThing,
    setThing,
    getStringNoLocale,
    setStringNoLocale,
    saveSolidDatasetAt,
    getPodUrlAll,
    universalAccess
  } from "@inrupt/solid-client";
  import { fetch, Session } from "@inrupt/solid-client-authn-browser";
  import { VCARD } from "@inrupt/vocab-common-rdf";
 
  // If your Pod is *not* on `solidcommunity.net`, change this to your identity provider.
  const SOLID_IDENTITY_PROVIDER = "http://localhost:3000";
  document.getElementById(
    "solid_identity_provider"
  ).innerHTML = `[<a target="_blank" href="${SOLID_IDENTITY_PROVIDER}">${SOLID_IDENTITY_PROVIDER}</a>]`;
 
  const NOT_ENTERED_WEBID =
    "...not logged in yet - but enter any WebID to read from its profile...";
 
  const session = new Session();
 
  const buttonLogin = document.getElementById("btnLogin");
  const writeForm = document.getElementById("writeForm");
  const readForm = document.getElementById("readForm");
 
  // 1a. Start Login Process. Call session.login() function.
  async function login() {
    if (!session.info.isLoggedIn) {
      await session.login({
        oidcIssuer: SOLID_IDENTITY_PROVIDER,
        clientName: "Inrupt tutorial client app",
        redirectUrl: window.location.href
      });
    }
  }
 
  // 1b. Login Redirect. Call session.handleIncomingRedirect() function.
  // When redirected after login, finish the process by retrieving session information.
  async function handleRedirectAfterLogin() {
    await session.handleIncomingRedirect(window.location.href);
    if (session.info.isLoggedIn) {
      // Update the page with the status.
      document.getElementById(
        "labelStatus"
      ).innerHTML = `Your session is logged in with the WebID [<a target="_blank" href="${session.info.webId}">${session.info.webId}</a>].`;
      document.getElementById("labelStatus").setAttribute("role", "alert");
      //document.getElementById("webID").value = session.info.webId;
       // Fetch or create a new reading list.
  let myReadingList;

  try {
    // Attempt to retrieve the reading list in case it already exists.
    //myReadingList = await getSolidDataset(SOLID_IDENTITY_PROVIDER, { fetch: session.fetch });
    myReadingList = await getSolidDataset(SOLID_IDENTITY_PROVIDER, { fetch: fetch });
    console.log(myReadingList)
    // Clear the list to override the whole list
    //let items = getThingAll(myReadingList);
    //items.forEach((item) => {
    //  myReadingList = removeThing(myReadingList, item);
    //});
  } catch (error) {
    if (typeof error.statusCode === "number" && error.statusCode === 404) {
      // if not found, create a new SolidDataset (i.e., the reading list)
      console.error(error);
      //myReadingList = createSolidDataset();
    } else {
      console.error(error.message);
    }
  }
      /*universalAccess.getAgentAccessAll(
        SOLID_IDENTITY_PROVIDER, // resource
        { fetch: session.fetch }                // fetch function from authenticated session
      ).then((accessByAgent) => {
        console.log(accessByAgent)
        // => accessByAgent is an object with Agent WebIDs as keys,
        //    and their associated access object {read: <boolean>, ... } as values.
        for (const [agent, agentAccess] of Object.entries(accessByAgent)) {
            
          //logAccessInfo(agent, agentAccess, resource);
        }
      });*/
      
      //const mypods = await getPodUrlAll(SOLID_IDENTITY_PROVIDER, { fetch: session.fetch });
      //console.log(mypods)
      /*universalAccess.getPublicAccess(
        SOLID_IDENTITY_PROVIDER,   // Resource
        { fetch: session.fetch }                  // fetch function from authenticated session
      ).then((returnedAccess) => {
        if (returnedAccess === null) {
          console.log("Could not load access details for this Resource.");
        } else {
          console.log("Returned Public Access:: ", JSON.stringify(returnedAccess));
        }
      });*/

    }
  }
 
  // The example has the login redirect back to the index.html.
  // This calls the function to process login information.
  // If the function is called when not part of the login redirect, the function is a no-op.
  handleRedirectAfterLogin();
 
  buttonLogin.onclick = function () {
    login();
  };