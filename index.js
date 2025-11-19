import path from 'node:path'
import * as dotenv from 'dotenv'
dotenv.config({ path: path.resolve("./src/config/.env.dev") })

console.log("KAFKA_BROKER =", process.env.KAFKA_BROKER)
console.log("DB_URI =", process.env.DB_URI)

import bootstrap from './src/app.controller.js'
import express from 'express'


const app = express()
const port = process.env.PORT || 5000

async function start() {
    await bootstrap(app , express)
    app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`))
}

start().catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
})
