//INTERACCIÓN CON AMADEUS 
//MENSAJERO ENTRE EL BACKEND Y AMADEUS 

import axios from "axios"
import fs from "fs/promises"
import dotenv from "dotenv"

dotenv.config();

const API_KEY = process.env.AMADEUS_API_KEY;
const API_SECRET = process.env.AMADEUS_API_SECRET;

let cachedToken = null;
let tokenExpiration = null;

async function getAccessToken() {

  const now = Date.now;

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



// Llamar búsqueda de vuelos
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

    throw new Error("Amadeus request failed");
  }

}

export async function getAmadeusFlight(id) {
  return { message: "Flight detail endpoint TBD", id };
}
