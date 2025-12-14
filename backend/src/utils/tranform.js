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


// Transforma un solo vuelo
export function transformSingleFlight(raw) {

  return {};
}
