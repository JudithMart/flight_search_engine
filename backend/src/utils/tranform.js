//CONVERTIR EL FORMATO ORIGINAL DE AMADEUS A FORMATO ESTÁNDAR 


export function transformFlightOffers(rawData) {

  if (!rawData || !rawData.data) {
    return [];
  }

 
  return rawData.data.map((offer) => {
  
    const itinerary = offer.itineraries?.[0];
    const segment = itinerary?.segments?.[0];

    return {
      // origin: departure.iataCode
      origin: segment?.departure?.iataCode || null,

      // destination: arrival.iataCode
      destination: segment?.arrival?.iataCode || null,

      //carrierCode 
      airline: segment?.carrierCode || null,

      //carrierCode + number 
      flight_number: segment?.carrierCode && segment?.number
        ? `${segment.carrierCode}${segment.number}`
        :null,

      // price.total (string → number)
      price: offer.price?.total
        ? Number(offer.price.total)
        : null,

      // price.currency
      currency: offer.price?.currency || null,

      //departure.at
      departure_time: segment?.departure?.at || null,

      //arrival.at
      arrival_time: segment?.arrival?.at || null,

      //itineraries.duration
      duration: itinerary?.duration || null,

      //numberOfBookableSeats
      availability: offer.numberOfBookableSeats || null,
    };
  });
}

// Transforma un solo vuelo
export function transformSingleFlight(raw) {

  return {};
}
