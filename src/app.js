const express = require("express");
const morgan = require("morgan");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const { leerConfiguracion } = require("./config/entorno");
const conectarDB = require("./config/base-datos");

const {
  identificarSolicitud,
  medirDuracion,
} = require("./middleware/solicitudes");
const { agregarSeccion } = require("./middleware/reservas");
const rutasReservas = require("./rutas/reservas");
const servicioReservas = require("./servicios/reservas");

const app = express();

// Leemos la configuración para obtener el formato de registro adecuado
const { formatoRegistro } = leerConfiguracion();

// Conectamos a MongoDB
conectarDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(identificarSolicitud);
app.use(medirDuracion);

app.use(morgan(formatoRegistro));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use(agregarSeccion);

app.get("/estado", (req, res) => {
  const cantidad = servicioReservas.contarReservas();
  res.json({ cantidad });
});

app.get("/", (req, res) => {
  res.render("inicio", { titulo: "Inicio" });
});

app.use("/reservas", rutasReservas);

app.use((req, res) => {
  res.status(404).render("no-encontrado", { titulo: "No encontrado" });
});

module.exports = app;
