//LÓGICA

import {searchInAmadeus, getAmadeusFlight} from  "../utils/amadeusClient.js";
import {transformFlightOffers, transformSingleFlight} from "../utils/tranform.js";


export async function fetchFlights(params){

    const rawData = await searchInAmadeus(params)

    return transformFlightOffers(rawData)
}

export async function fetchFlightDetails(id){
    const raw = await getAmadeusFlight(id)

    return transformFlightOffers(raw)
}