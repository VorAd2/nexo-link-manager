// routes/upload.ts

import { Router } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";

// <<< DESTAQUE 1: Importando a conexão única do banco de dados
import { dbConnection } from "../../db/mariaDB";

// Importe o middleware de autenticação e a interface
import { authenticateToken, AuthenticatedRequest } from "../middleware";

const router = Router();

// --- Configuração do Multer (sem alterações) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "api/uploads"),
    filename: (req, file, cb) => {
        const MAX_FILENAME_BYTES = 40;
        const fileExtension = path.extname(file.originalname);
        const extensionBytes = Buffer.from(fileExtension).length;
        const availableBytesForBaseName = MAX_FILENAME_BYTES - extensionBytes;
        if (availableBytesForBaseName <= 0) {
            return cb(new Error(`A extensão do arquivo é muito longa`), "");
        }
        const randomBytesCount = Math.ceil(availableBytesForBaseName / 2);
        let randomName = crypto.randomBytes(randomBytesCount).toString("hex");
        randomName = randomName.slice(0, availableBytesForBaseName);
        const finalFilename = randomName + fileExtension;
        cb(null, finalFilename);
    }
});
const upload = multer({ storage: storage });

// --- Rota de Upload Atualizada ---
router.post("/api/upload", authenticateToken, upload.single("archive"), async (req: AuthenticatedRequest, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const pk_id_owner = req.user.id;
    const download_link = `/api/uploads/${req.file.filename}`;
    const { originalname, size, mimetype } = req.file;

    const sql = `
        INSERT INTO files (ownerId, downloadLink, originalName, fileSize, mimeType, uploadedAt)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const values = [pk_id_owner, download_link, originalname, size, mimetype];

    // <<< DESTAQUE 2: Usando a conexão diretamente
    // Não há mais 'try/catch/finally' para gerenciar a conexão, pois ela é persistente.
    try {
        // Executamos a query diretamente no objeto de conexão importado.
        const [result] = await dbConnection.execute(sql, values);
        
        const insertResult = result as any;
        console.log(`Arquivo registrado no banco com o ID: ${insertResult.insertId}`);

        res.status(201).json({
            message: "Upload realizado e registrado com sucesso!",
            file: {
                id: insertResult.insertId,
                link: download_link
            }
        });

    } catch (error) {
        console.error("Erro ao executar a query no banco de dados:", error);
        // A lógica para deletar o arquivo órfão em caso de erro continua sendo uma boa prática.
        // import fs from 'fs/promises';
        // await fs.unlink(req.file.path);
        return res.status(500).json({ error: "Não foi possível registrar o arquivo no banco de dados." });
    }
    // <<< DESTAQUE 3: Não há mais 'connection.release()'
    // Como a conexão é única e persistente, não a liberamos.
});

// ... (outras rotas)
export { router };



// import { Router } from "express";
// import multer from "multer";
// import path from "path"; // Importe o módulo 'path' do Node.js
// import crypto from "crypto"; // (Opcional) Para gerar nomes de arquivo únicos
// import { connectDB } from "../../db/mariaDB";


// const router = Router();


// const db = await connectDB

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "api/uploads");
//     },
//     filename: (req, file, cb) => {
//         const fileExtension = path.extname(file.originalname);
//         const randomName = crypto.randomBytes(16).toString("hex");
//         cb(null, `${randomName}${fileExtension}`);
//     }
// });

// const upload = multer({ storage: storage });

// // --- Rota de Upload Atualizada ---

// // Estendendo a interface Request para o nosso handler
// import { Request } from 'express';
// import { authenticateToken } from "../middleware";
// interface AuthenticatedRequest extends Request {
//   user?: {
//     id: number; // ou string
//   };
// }

// // O fluxo será: 1. Autenticação -> 2. Upload do arquivo -> 3. Lógica do handler
// router.post("/api/upload", authenticateToken, upload.single("archive"), async (req: AuthenticatedRequest, res) => {
//     // 1. Validações iniciais
//     if (!req.file) {
//         return res.status(400).json({ error: "Nenhum arquivo enviado." });
//     }
//     if (!req.user || !req.user.id) {
//         // Essa verificação é uma segurança extra
//         return res.status(401).json({ error: "Usuário não autenticado." });
//     }

//     // Preparar os dados para o banco
//     const pk_id_owner = req.user.id;
//     //link de download. Pode ser um caminho relativo ou uma URL completa.
//     // Ex: "https://meusite.com/api/uploads/nome_do_arquivo.png"
//     const download_link = `/api/uploads/${req.file.filename}`;
//     try {
//         // Salvar as informações no banco de dados
//         const fileRecord = await db.file.create({ // 'file' é um exemplo de nome de tabela/modelo
//             data: {
//                 ownerId: pk_id_owner, 
//                 downloadLink: download_link,
//                 originalName: req.file.originalname,
//                 fileSize: req.file.size,
//                 mimeType: req.file.mimetype,
//             }
//         } );

//         console.log("Arquivo salvo no banco de dados:", fileRecord);

//         // 4. Retornar uma resposta de sucesso
//         res.status(201).json({
//             message: "Upload realizado e registrado com sucesso!",
//             file: {
//                 id: fileRecord.id,
//                 link: download_link
//             }
//         });

//     } catch (error) {
//         console.error("Erro ao salvar informações do arquivo no banco:", error);
//         // TODO: Em um cenário de produção, deletar o arquivo físico
//         // que foi salvo se a escrita no banco de dados falhar, para não deixar "lixo".
//         return res.status(500).json({ error: "Não foi possível registrar o arquivo." });
//     }
// });
