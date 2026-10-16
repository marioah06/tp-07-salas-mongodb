const { leerConfiguracion } = require("./config/entorno");
const app = require("./app");

const { puerto } = leerConfiguracion();
const ambienteActual = process.env.NODE_ENV || "development";

app.listen(puerto, () => {
  console.log(
    `Servidor corriendo en http://localhost:${puerto} [Ambiente: ${ambienteActual}]`,
  );
});
