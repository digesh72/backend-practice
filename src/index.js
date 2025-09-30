import dotenv from "dotenv"
import connectDB from "./db_config/index.js";

dotenv.config({
    path: './env'
})


connectDB()