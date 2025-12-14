
import { searchInAmadeus, getAmadeusFlight } from "../utils/amadeusClient.js";
import { transformFlightOffers, transformSingleFlight } from "../utils/tranform.js";


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