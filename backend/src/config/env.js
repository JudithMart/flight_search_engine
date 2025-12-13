import dotenv from "dotenv"

dotenv.config();

export const config ={
     amadeusKey: process.env.AMADEUS_API_KEY,
     amadeusSecret: process.env.AMADEUS_API_SECRET,
     port: process.env.PORT || 3000,
}