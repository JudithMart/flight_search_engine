//CREAR EL SERVIDOR EXPRESS

import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import flightsRouter from "./routes/flights.routes.js"

const app = express()
app.use(cors())
app.use(express.json())


app.use("/api",flightsRouter)

app.get('/api/health', (req, res) => {
   res.status(200).json({ status: "ok" });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
