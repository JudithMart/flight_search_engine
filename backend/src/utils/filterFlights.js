export function filterByPrice(flights, maxPrice) {
  if (!Array.isArray(flights)) return [];

  return flights.filter(flight => flight.price <= maxPrice);
}
