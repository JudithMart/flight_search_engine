/*
Utils: Transform

Responsabilidad:
Este archivo actúa como una capa de utilidades encargada de transformar
los datos crudos recibidos desde la API de Amadeus a un formato estándar


function transformFlightOffers
    Recibe los datos crudos devueltos por la API de Amadeus
   Si no existen datos válidos, retorna un arreglo vacío
   Extrae la información del primer itinerario
   Unifica los segmentos del vuelo
   Calcula:
    Origen y destino
    Aerolínea
    Número de vuelo
    Precio y moneda
    Hora de salida y llegada
    Duración total
     Número de escalas
    Asientos disponibles
  Devuelve un arreglo de vuelos con formato estándar
    
*/ 



export function transformFlightOffers(rawData) {
  if (!rawData || !rawData.data) {
    return [];
  }

  function formatDuration(isoDuration) {
    if (!isoDuration) return null;

    const hours = isoDuration.match(/(\d+)H/);
    const minutes = isoDuration.match(/(\d+)M/);

    const h = hours ? `${hours[1]}h` : "";
    const m = minutes ? `${minutes[1]}m` : "";

    return `${h} ${m}`.trim();
  }

  return rawData.data.map((offer) => {
    const itinerary = offer.itineraries?.[0];
    const segments = itinerary?.segments || []; 
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];

    return {
      origin: firstSegment?.departure?.iataCode || null,
      destination: lastSegment?.arrival?.iataCode || null,

      airline: firstSegment?.carrierCode || null,

      flight_number:
        firstSegment?.carrierCode && firstSegment?.number
          ? `${firstSegment.carrierCode}${firstSegment.number}`
          : null,

      price: offer.price?.total ? Number(offer.price.total) : null,
      currency: offer.price?.currency || null,

      departure_time: firstSegment?.departure?.at
        ? firstSegment.departure.at.split("T")[1].slice(0, 5)
        : null,

      arrival_time: lastSegment?.arrival?.at
        ? lastSegment.arrival.at.split("T")[1].slice(0, 5)
        : null,

      duration: formatDuration(itinerary?.duration),

      scales: segments.length > 0 ? segments.length - 1 : 0,

      availability: offer.numberOfBookableSeats || null,
    };
  });
}



export function transformSingleFlight(raw) {

  return {};
}
