import { IDPPATTERNS } from '@/utils/constants'

export default defineContentScript({
  matches: ['*://*.google.com/*'],
  main() {
    //Funcion para buscar patrones en la URL
    function checkUrl() {
      const currentUrl = window.location.href;
      IDPPATTERNS.forEach(pattern => {
          if (currentUrl.includes(pattern)) {
              console.log('Patron IDP encontrado en la URl: ', pattern)
              window.localStorage.setItem('IDP-URL', pattern)
          }
      });
    }

    // Funcion para buscar patrones en el contennido Html
    function checkContentUrl() {
      const bodyText = document.body.innerText;
      
      IDPPATTERNS.forEach(pattern => {
          if (bodyText.includes(pattern)) {
              console.log('Patron IDP encontrado en el contenido', pattern)
              window.localStorage.setItem('IDP-CONTENT', pattern)
          }
      })
    }

    checkUrl()
    checkContentUrl()
    
  },
});
