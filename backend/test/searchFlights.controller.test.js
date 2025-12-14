import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";



await jest.unstable_mockModule("../src/services/flights.service.js", () => ({
    fetchFlights: jest.fn(),
    fetchFlightDetails: jest.fn()
}));


const flightsService = await import("../src/services/flights.service.js");
const { searchFlights } = await import("../src/controllers/flights.controller.js");


const app = express();
app.get("/api/search", searchFlights);

describe("GET /api/search", () => {
    //caso1

    it("should return 400 if required params are missing", async () => {
        const response = await request(app).get("/api/search");

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("BAD_REQUEST");
    });

    //caso 2
    it("should return flights when params are valid", async () => {
      flightsService.fetchFlights.mockResolvedValue([
            { origin: "MEX", destination: "CUN", price: 100 }
        ]);

        const response = await request(app)
            .get("/api/search")
            .query({
                origin: "MEX",
                destination: "CUN",
                date: "2026-01-10"
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].price).toBe(100);
    });
});

