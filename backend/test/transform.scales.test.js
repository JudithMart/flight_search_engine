import { transformFlightOffers } from "../src/utils/tranform.js";

const mockDataWithScale = {
  data: [
    {
      price: { total: "120.00", currency: "USD" },
      itineraries: [
        {
          duration: "PT4H30M",
          segments: [
            {
              carrierCode: "AM",
              number: "101",
              departure: { iataCode: "MEX", at: "2026-01-10T08:00:00" },
              arrival: { iataCode: "GDL", at: "2026-01-10T09:30:00" }
            },
            {
              carrierCode: "AM",
              number: "202",
              departure: { iataCode: "GDL", at: "2026-01-10T10:30:00" },
              arrival: { iataCode: "CUN", at: "2026-01-10T12:30:00" }
            }
          ]
        }
      ],
      numberOfBookableSeats: 3
    }
  ]
};

describe("transformFlightOffers - scales", () => {
  it("should calculate correct number of scales", () => {
    const result = transformFlightOffers(mockDataWithScale);

    expect(result).toHaveLength(1);
    expect(result[0].scales).toBe(1);
  });
});
