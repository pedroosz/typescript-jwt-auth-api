import dotenv from "dotenv"
import express from "express";
import { router } from "./routes";
const app = express()

dotenv.config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`[SERVER] Running on port ${PORT}`)
})