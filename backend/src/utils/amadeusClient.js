//INTERACCIÓN CON AMADEUS 
//MENSAJERO ENTRE EL BACKEND Y AMADEUS 

import axios from "axios"
import fs from "fs/promises"
import dotenv from "dotenv"

dotenv.config();

const API_KEY = process.env.AMADEUS_API_KEY;
const API_SECRET = process.env.AMADEUS_API_SECRET

async function getAccessToken(){
    return "TOKEN"
}

// Llamar búsqueda de vuelos
export async function searchInAmadeus(params) {
  // Si quieres usar mock mientras avanzas:
  // const mockData = await fs.readFile("./src/mock/amadeus.json", "utf8");
  // return JSON.parse(mockData);

  // En producción usarás la API real
  const token = await getAccessToken();

  // Luego harás GET a flight-offers
  // Por ahora regresamos un objeto vacío para que no truene.
  return { data: [] };
}

// Obtener detalles de un vuelo
export async function getAmadeusFlight(id) {
  // Por ahora regresa vacío
  return {};
}