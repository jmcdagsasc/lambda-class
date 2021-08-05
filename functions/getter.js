require("dotenv").config();

exports.handler = function (event, context, callback) {
  // Tres parámetros que tiene la función: event, context, callback
  /*
    event:
        Nos trae todo lo que llegó del navegador o del endopoint final
        Incluye los headers
    context:
        Info o metadatos "extras" desde la llamada a la API
    callback:
        La función que se ejecuta después de realizar la lógica de la lambda
        Es la función que responde al que llamó a la API
    */

  //   const DB_URL = "http://mi-base-de-datos.com/api";
  const { MI_APPI_KEY } = process.env;
  const solicitudAMongo = "qwerty01234";
  //   console.log("Variable de entorno: ", MI_APPI_KEY);
  console.log("EVENT");
  console.log(event);

  let cantidad = event.queryStringParameters.dolar * 20.69;

  let monedasDelMundo = {
    euros: {
      2020: 23.51,
      2021: 25.63,
    },
    dolares: {
      2020: 19.51,
      2021: 20.63,
    },
  };

  // minimo requerido: enviar un 401 Unauthorize y un 200 OK status code
  // si quieres verte pro: 400 Bad request, 403 Forbidden

  let body = { pesos: cantidad };

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(body),
  });
};
