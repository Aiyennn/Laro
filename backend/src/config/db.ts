import mysql from 'mysql2/promise';

interface dbEnv {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
}

export const connectDb = async ({host, port, user, password, database} : dbEnv) => {
    try {
        console.log("[INFO] Connecting to database");
        await mysql.createConnection({
            host: host,
            port: port,
            user: user,
            password: password,
            database: database,
    })
    console.log("[INFO] DB successfully connected");
    } catch (err) {
        console.error("[ERROR] Database Connection Error", err)
        throw new Error("Database failed to connect");
    }
}