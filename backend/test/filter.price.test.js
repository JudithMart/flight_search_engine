import { filterByPrice } from "../src/utils/filterFlights.js";

const mockFlights = [
  { price: 80, airline: "AM" },
  { price: 120, airline: "Volaris" },
  { price: 200, airline: "Viva" }
];

describe("filterByPrice", () => {
  it("should return flights cheaper or equal than maxPrice", () => {
    const result = filterByPrice(mockFlights, 100);

    expect(result).toHaveLength(1);
    expect(result[0].price).toBe(80);
  });
});

it("should return empty array when no flights match", () => {
  const result = filterByPrice(mockFlights, 50);

  expect(result).toEqual([]);
});
