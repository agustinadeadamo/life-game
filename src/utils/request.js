/**
* @desc Realiza una solicitud de metodo GET
* 
* @param { String } endpoint 
* 
* @return { Promise }
*/
export const get = async ( endpoint) => {

   try{

     // Cabeceras.
        let method  = "GET";

     // Armamos el requester
     let request = new Request( endpoint, { method });

     // Realizamos la solicitud
     let response = await fetch( request );

     if(response.status === 200 || response.status === 400 || response.status === 401 || response.status === 404 || response.status === 409 ) {

       // Respuesta parseada
       let responseParsed = await response["json"]();

       // Asignamos a la respuesta las cabeceras.
       responseParsed.status = response.status;

       // Parseamos la respuesta.
       return responseParsed;

     }

   }catch( error ){

    console.log(error, 'ERROR')

     // Rechazamos la solicitud.
     return error;

   }

}