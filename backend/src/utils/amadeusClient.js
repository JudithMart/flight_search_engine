import axios from "axios"
import fs from "fs/promises"
import dotenv from "dotenv"



/*
Utils: AmadeusClient

Responsabilidad:
Este archivo actúa como capa de util. 
Encargada de la comunicación directa con la API de Amadeus.
Gestiona la autenticación, el consumo del servicio externo y el manejo
de errores mediante fallback a datos mock.


function getAccessToken()
    Solicita un token OAuth2 a Amadeus usando client_id y client_secret definidos en el archivo .env
    Almacena el token en memoria (cachedToken)
    Reutiliza el token mientras no haya expirado
    Genera un nuevo token cuando el anterior ya no es válido  
    Devuelve el token de acceso

function  searchInAmadeus
    Recibe los parámetros de búsqueda:
      origin
      destination
      date
    Obtiene un token válido mediante getAccessToken
    Consume el endpoint de búsqueda de vuelos de Amadeus usando axios
    Retorna la respuesta cruda de Amadeus

Manejo de errores:
    Si ocurre un error en el sandbox de Amadeus:
        Se registra el error en consola
        Se utiliza un archivo mock local como fallback
        Se retorna el mock para no interrumpir el flujo del sistema
*/ 



dotenv.config();

const API_KEY = process.env.AMADEUS_API_KEY;
const API_SECRET = process.env.AMADEUS_API_SECRET;

let cachedToken = null;
let tokenExpiration = null;

async function getAccessToken() {

  const now = Date.now();

  if (cachedToken && tokenExpiration && now < tokenExpiration) {
    return cachedToken
  }

  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: API_KEY,
      client_secret: API_SECRET,
    })

  );

  cachedToken = response.data.access_token;
  tokenExpiration = now + (response.data.expires_in * 1000);

  return cachedToken;


}
export { getAccessToken };


export async function searchInAmadeus({ origin, destination, date, sort }) {

  const token = await getAccessToken();

  const params = {
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: date,
    adults: 1,
    max: 20,
  };

  try {
    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 8000,
      }
    );

    return response.data;
  }
  catch (err) {
    console.error("Error al buscar en Amadeus:", err.response?.data || err.message);
    console.warn("Amadeus sandbox error, using mock data");

    const mock = await fs.readFile("./src/mock/amadeus.json", "utf8");
    return JSON.parse(mock);


  }

}

export async function getAmadeusFlight(id) {
  return { message: "Flight detail endpoint TBD", id };
}
