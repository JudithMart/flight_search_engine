//LEER PARÁMETROS 
//solo gestiona la entrada y salida.
//valida parámetros 
//recibe json 

import { fetchFlights, fetchFlightDetails } from "../services/flights.service.js"

export async function searchFlights(req, res) {
    try {
        const { origin, destination, date, sort } = req.query

        if (!origin || !destination || !date) {
            return res.status(400).json({
                error: "BAD_REQUEST",
                message: "origin, destination and date are required"
            })

        }

        const flights = await fetchFlights({ origin, destination, date, sort })

        return res.status(200).json(flights)

    } catch (err) {
        if (err.type === "EXTERNAL_API_ERROR") {
            return res.status(502).json({
                error: "BAD_GATEWAY",
                message: err.message
            });
        }

        return res.status(500).json({
            err: "INTERNAL_SERVER_ERROR",
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
            console.error("Error en getFlightsDetails: ", err)

            return res.status(500).json({
                error: "Server error FlightDetails",
                message: err.message,

            })

        }
    }



