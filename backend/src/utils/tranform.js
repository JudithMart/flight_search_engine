//CONVERTIR EL FORMATO ORIGINAL DE AMADEUS A FORMATO ESTÁNDAR 

// Transforma múltiples vuelos
export function transformFlightOffers(rawData) {
// 1. Verificación básica
  if (!rawData || !rawData.data) {
    return [];
  }

  // 2. Recorremos cada vuelo
  return rawData.data.map((offer) => {
    // Tomamos el primer itinerario y el primer segmento
    const itinerary = offer.itineraries?.[0];
    const segment = itinerary?.segments?.[0];

    return {
      // origin: departure.iataCode
      origin: segment?.departure?.iataCode || null,

      // destination: arrival.iataCode
      destination: segment?.arrival?.iataCode || null,

      // price.total (string → number)
      price: offer.price?.total
        ? Number(offer.price.total)
        : null,

      // price.currency
      currency: offer.price?.currency || null,
    };
  });
}

// Transforma un solo vuelo
export function transformSingleFlight(raw) {
  return {};
}
