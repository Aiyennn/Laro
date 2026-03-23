import mysql, { Pool } from 'mysql2/promise';
let pool : Pool;

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

        pool =  mysql.createPool({
            host,
            port,
            user,
            password,
            database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        const connection = await pool.getConnection();
        console.log("[INFO] DB successfully connected");
        connection.release();
    } catch (err) {
        console.error("[ERROR] Database Connection Error", err)
        throw new Error("Database failed to connect");
    }
}

export const getPool = () => {
  if (!pool) {
    throw new Error("Pool not initialized. Call connectDb first.");
  }
  return pool;
};

export async function query<T>(sql: string, params?: any[]): Promise<T[]> {
  const pool = getPool();
  const [rows] = await pool.execute(sql, params);
  return rows as T[];
}