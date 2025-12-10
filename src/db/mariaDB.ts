// lib/db.ts
import mysql from 'mysql2/promise';

// Função assíncrona para criar e exportar a conexão.
// Usamos uma função para poder usar 'await' no nível superior.
async function createDbConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: Number(process.env.DB_PORT) || 3306
        });
        console.log("Conexão com MariaDB estabelecida com sucesso (conexão única).");
        return connection;
    } catch (error) {
        console.error("FALHA AO CONECTAR COM O BANCO DE DADOS:", error);
        // Se a conexão falhar ao iniciar o app, o processo deve ser encerrado.
        process.exit(1);
    }
}

// Exportamos a promessa da conexão.
// O Node.js irá aguardar a resolução desta promessa antes de executar os módulos que a importam.
export const dbConnection = await createDbConnection();
