import mysql from "mysql2/promise";

// arquivo de conexão com o banco

export const db = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: "root1",
    database: "pweb3_db"
});