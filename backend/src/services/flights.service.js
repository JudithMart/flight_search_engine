import { searchInAmadeus, getAmadeusFlight } from "../utils/amadeusClient.js";
import { transformFlightOffers, transformSingleFlight } from "../utils/tranform.js";


/*
Service: Flights

Responsabilidad:
Esta capa contiene la lógica de negocio relacionada con vuelos.
Se encarga de interactuar con Amadeus, transformar los datos,
eliminar duplicados y aplicar reglas como ordenamiento.

function fetchFlights
    Recibe parámetros de búsqueda
    Llama a Amadeus mediante searchInAmadeus
    Transforma la respuesta al formato estándar del proyecto
    Elimina vuelos duplicados usando:
      flight_number
      departure_time
    Aplica ordenamiento por precio si sort === "price"
    Retorna una lista limpia de vuelos

function etchFlightDetails
    Reibe el id del vuelo 
    Transforma la respuesta al formato estándar
    Retorna el detalle del vuelo

*/ 


export async function fetchFlights(params) {

    const rawData = await searchInAmadeus(params);
    const flights = transformFlightOffers(rawData);
    const uniqueFlights = new Map();
   

    flights.forEach(flight => {
        const key = `${flight.flight_number}-${flight.departure_time}`;
        if (!uniqueFlights.has(key)) {
            uniqueFlights.set(key, flight);
        }
    });

    const cleanFlights = Array.from(uniqueFlights.values());


    if (params.sort === "price") {
        cleanFlights.sort((a, b) => a.price - b.price);
    }

    return cleanFlights;
}


export async function fetchFlightDetails(id) {
    const raw = await getAmadeusFlight(id)

    return transformSingleFlight(raw)
}