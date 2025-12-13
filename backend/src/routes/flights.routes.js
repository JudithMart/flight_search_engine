//DEFINE QUE ENDPOINTS EXISTEN Y A QUE CONTOLLER LLAMAN

import {Router} from "express"
import { searchFlights, getFlightDetails } from "../controllers/flights.controller.js";

const router = Router()

router.get("/search", searchFlights)

router.get("flight/:id", getFlightDetails)

export default router