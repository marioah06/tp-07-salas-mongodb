import mongoose from "mongoose";
import dns from "node:dns";
import { leerUriMongo } from "./entorno.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function conectarBaseDatos() {
  await mongoose.connect(leerUriMongo(), {
    serverSelectionTimeoutMS: 5000,
  });
}

export async function desconectarBaseDatos() {
  await mongoose.disconnect();
}