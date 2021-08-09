import { data } from "../tasa-conversion.json";
require("dotenv").config();

/* Simulación de llamada a la base de datos */
const tasaConversion = (moneda, anio, password) => {
  if (password == "qwerty01234") {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(data[moneda][anio]), 400);
    });
  }
  return JSON.stringify({ error: "No tienes permiso" });
};

exports.handler = async function (event, context, callback) {
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

  /* Constantes a usar */
  const { MI_APPI_KEY } = process.env;
  const solicitudAMongo = "qwerty01234";
  const ev = event.queryStringParameters;

  let isLegalCall = false;

  /* Lógica de consulta a la base de datos */
  const responder = async () => {
    let tasa = await tasaConversion(ev.moneda, ev.anio, "qwerty01234");
    return {
      statusCode: 200,
      body: JSON.stringify({ pesos: tasa * ev.cantidad }),
    };
  };

  /* Validación */
  let error = "";
  try {
    if (typeof JSON.parse(ev.anio) == "number") {
      isLegalCall = true;
    }
  } catch {
    error = "Año no es un número";
    console.log(error);
  }

  const sendErrorMsg = () => {
    return {
      statusCode: 400,
      body: JSON.stringify({ msg: "Datos incorrectos" }),
    };
  };

  /* Respuesta al front end --> sustiyendo al callback */
  return isLegalCall ? await responder() : sendErrorMsg();
};
