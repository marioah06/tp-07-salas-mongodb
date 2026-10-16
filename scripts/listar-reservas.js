import {
  conectarBaseDatos,
  desconectarBaseDatos,
} from "../src/config/base-datos.js";
import Reserva from "../src/modelos/reserva.js";

async function main() {
  try {
    await conectarBaseDatos();

    const reservas = await Reserva.find({});

    console.table(
      reservas.map((r) => ({
        id: r._id.toString(),
        estudiante: r.estudiante,
        email: r.email,
        sala: r.sala,
        fecha: r.fecha,
        turno: r.turno,
        personas: r.personas,
      })),
    );

    console.log("Total de reservas:", reservas.length);
  } finally {
    await desconectarBaseDatos();
  }
}

main().catch((error) => {
  console.error("No se pudo consultar las reservas:", error.name);
  console.error("Revisar configuración y disponibilidad de MongoDB.");
  process.exitCode = 1;
});
