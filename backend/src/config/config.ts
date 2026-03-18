import dotenv from 'dotenv';
import { DatabaseSync } from 'node:sqlite';

dotenv.config();

const getEnvVar = (key: string): string => {
    const value = process.env[key] || null
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

export const config = {
    dbEnv: {
        host: getEnvVar("host"),
        user: getEnvVar("user"),
        password: "", // Xampp default
        database: getEnvVar("database"),
        port: parseInt(getEnvVar("dbport")),
    },
    port: 3000 // change
}