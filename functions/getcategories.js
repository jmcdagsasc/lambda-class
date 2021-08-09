const axios = require("axios");

exports.handler = function (event, context, callback) {
  const ORDERING_URL = `https://apiv4.ordering.co/v400/en/farmazone/business/411/categories`;

  // Función que limpia la data y la ordena
  const sendCleanData = () => {
    // EJERCICIO 1: Incluir la lógica de la función para que solo obtenga id, business_id, name, enabled, img
    //      NO queremos products
    // EJERCICIO 2: Hacer que se pueda consultar dinámicamente cualquier business
    // EJERCICIO 3: Intentar romper la lambda y canalizar los errores para que se entregue
    //      info legible y útil al front end
    // EJERCICIO 4: Realizar un README con documentación de todas las lambdas y su uso
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
