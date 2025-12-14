import { transformFlightOffers } from "../src/utils/tranform.js";


describe("transformFlightOffers - error handling", () => {
    //CASO 1
  it("should return empty array when rawData is null", () => {
    const result = transformFlightOffers(null);

    expect(result).toEqual([]);
  });

//CASO 2
  it("should return empty array when rawData has no data property", () => {
    const result = transformFlightOffers({});

    expect(result).toEqual([]);
  });
});
