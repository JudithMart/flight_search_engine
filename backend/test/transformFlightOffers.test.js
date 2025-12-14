import { transformFlightOffers } from "../src/utils/tranform.js";

describe("transformFlightOffers", () => {
  it("should transform Amadeus data to standard flight format", () => {
    const mockData = {
      data: [
        {
          price: { total: "100.50", currency: "USD" },
          itineraries: [
            {
              duration: "PT2H10M",
              segments: [
                {
                  carrierCode: "AM",
                  number: "123",
                  departure: { iataCode: "MEX", at: "2026-01-10T08:00:00" },
                  arrival: { iataCode: "CUN", at: "2026-01-10T10:10:00" }
                }
              ]
            }
          ],
          numberOfBookableSeats: 5
        }
      ]
    };

    const result = transformFlightOffers(mockData);

    expect(result).toHaveLength(1);
    expect(result[0].origin).toBe("MEX");
    expect(result[0].destination).toBe("CUN");
    expect(result[0].price).toBe(100.5);
    expect(result[0].scales).toBe(0);
  });
});
