
import { fetchFlights, fetchFlightDetails } from "../services/flights.service.js"

/*
Controller: Flights

Responsabilidad:
Este archivo actúa como capa de control (controller).
Recibe las peticiones HTTP, valida los parámetros de entrada
y delega la lógica de negocio a la capa de servicios.

function searchFlights
    Endpoint: GET /api/search
    Lee parámetros desde req.query
    Parámetros requeridos:
         origin, destination, date, sort (opcional)
    Retorna lista de vuelos transformada
    Valida que los parámetros obligatorios existan  
        200 OK: vuelos encontrados
        400 BAD_REQUEST: parámetros faltantes
        502 BAD_GATEWAY: error en API externa (Amadeus)
        500 INTERNAL_SERVER_ERROR: error inesperado del servidor

function getFlightDetails
    Endpoint: GET /api/flights/:id
    Lee el parámetro id desde req.params
    Retorna el detalle del vuelo
    200 OK: detalle del vuelo
    400 BAD_REQUEST: id faltante
    500 INTERNAL_SERVER_ERROR: error interno

*/

export async function searchFlights(req, res) {
    try {
        const { origin, destination, date, sort } = req.query

        if (!origin || !destination || !date) {
            return res.status(400).json({
                error: "BAD_REQUEST",
                message: "origin, destination and date are required"
            })

        }

        if (!/^[A-Z]{3}$/.test(origin) || !/^[A-Z]{3}$/.test(destination)) {
            return res.status(400).json({
                error: "INVALID_IATA_CODE",
                message: "Origin y destination deben ser códigos IATA de 3 letras (ej. MEX, CUN)"
            });
        }




        const flights = await fetchFlights({ origin, destination, date, sort })

        return res.status(200).json(flights)

    } catch (err) {
        if (err.type === "EXTERNAL_API_ERROR") {
            return res.status(502).json({
                error: "BAD_GATEWAY",
                message: "Flight service temporarily unavailable"
            });
        }

        return res.status(500).json({
            error: "INTERNAL_SERVER_ERROR",
            message: "Unexpected server error"
        });
    }
}


export async function getFlightDetails(req, res) {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: "Flight ID is required" })
        }

        const flight = await fetchFlightDetails(id);

        return res.status(200).json(flight)
    } catch (err) {
        console.error("getFlightsDetails: ", err)

        return res.status(500).json({
            error: "FlightDetails error server",
            message: err.message,

        })

    }
}



