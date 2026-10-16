import {
  conectarBaseDatos,
  desconectarBaseDatos,
} from "../src/config/base-datos.js";
import Reserva from "../src/modelos/reserva.js";

async function main() {
  try {
    await conectarBaseDatos();

    const reserva = await Reserva.create({
      estudiante: "Mario Herrera",
      email: "mario.herrera@example.com",
      sala: "Sala Multimedia",
      fecha: "2026-06-15",
      turno: "Mañana",
      personas: 2,
    });

    console.log("Reserva guardada con éxito. ID:", reserva._id.toString());
  } finally {
    await desconectarBaseDatos();
  }
}

main().catch((error) => {
  console.error("No se pudo crear la reserva:", error.name);
  if (error.errors) {
    console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
  }
  console.error("Revisar datos, configuración y disponibilidad de MongoDB.");
  process.exitCode = 1;
});
