import { SAASDOMAIN, IDPPATTERNS_REDIRECT } from '@/utils/constants';

export default defineBackground(() => {
  console.log('Hello background!', { 
    id: browser.runtime.id,
    manifest: browser.runtime.getManifest(), 
  });

  const urlVisit = []
  const noSaas = []
  let arrayIdpDetected : string[] = []

  // Cuando se ejecuta una ves que complete la navegacion 
  browser.webNavigation.onCompleted.addListener((details) => {
    urlVisit.push(details.url)

    console.log('Cantidad de urls visitadas:' + urlVisit.length) // obtengo la cantidad de irl visitados


    const isSaas = SAASDOMAIN.some((saas) => {
      return details.url.includes(saas)
    })
    if (isSaas) {
      arrayIdpDetected.push(details.url)
    } else {
      console.log(`Url no es saas: ${details.url}`)
      noSaas.push(details.url)
    }

    
  }, { url: [{ urlMatches: 'https://*' }] })

  // Se ejecuta antes de obtener la solicitud
  browser.webRequest.onBeforeRequest.addListener((details) => {
    console.log('Request: ' + details.url)
    // si la url cumple con el patron guardo la url detectada en el arreglo
    if(IDPPATTERNS_REDIRECT.some(pattern => details.url.includes(pattern))) {
      console.log('Idp detected: ' + details.url)
      arrayIdpDetected.push(details.url)
    }

  }, { urls: ["<all_urls>"] }, ["requestBody"])

  // se ejecuta cuando se completa la navegacion 
  browser.webRequest.onCompleted.addListener((details) => {
    // si la url q contiene el detalle esta dentro de las urls detectadas obtengo su encabezado
    if (arrayIdpDetected.some(idp => idp === details.url)) {
      const headers = details.responseHeaders // obtengo el encabezado de la respuesta
      

      const { documentUrl, ip, url, statusCode, requestId, tabId } = details // obtengo datos relevantes de la peticion
      if (headers) { // si existe el encabezado
        const tokenHeader = headers.find(header => header.name.toLowerCase() === 'authorization'); // obtengo el token si el encabezado tiene la palabra clave authorization
        if (tokenHeader) { // si existe 
          console.log('Token:', tokenHeader.value); // obtengo el token
          browser.storage.local.set({ 'dataUser': {documentUrl, ip, url, statusCode, requestId, tabId, token : tokenHeader.value }}) // guardo los datos en el localstore de la extencion
        } else {
          browser.storage.local.set({ 'dataUser': {documentUrl, ip, url, statusCode, requestId, tabId, token : ''}})
        }

      }
    }
  }, { urls: ["<all_urls>"] }, ["responseHeaders"]) // Configuro el listener el cual indico para que urls quiero que se aplique y  en la segunda opcion es el objeto que quiero obtener dentro del detail
  
});
