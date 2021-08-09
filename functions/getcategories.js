const axios = require("axios");

exports.handler = function (event, context, callback) {
  const ORDERING_URL =
    "https://apiv4.ordering.co/v400/en/farmazone/business/411/categories";

  // Función que limpia la data y la ordena
  const sendCleanData = () => {
    // Incluir la lógica de la función para que solo obtenga id, business_id, name, enabled
    // NO queremos products
  };

  // Función que conjunta datos de la API y responde
  const send = (statusCode, body) => {
    callback(null, {
      statusCode,
      body: sendCleanData(body.result),
    });
  };

  // Función principal
  const response = () => {
    axios
      .get(ORDERING_URL)
      .then((res) => send(200, res.data))
      .catch((err) => send(400, err));
  };

  // Validación de tipo de solicitud
  if (event.httpMethod == "GET") response();
};
