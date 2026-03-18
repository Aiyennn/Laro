import express from "express";
import { connectDb } from "./config/db";
import { config } from "./config/config";

const app = express();

app.use(express.json());    

const startServer = async () => {
    try {
        await connectDb(config.dbEnv)
        const PORT = config.port || 3000;
        app.listen(PORT, () => {
            console.log(`[INFO] Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error("[ERROR] Server failed to start")

    }
}

startServer();