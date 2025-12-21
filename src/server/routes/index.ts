import { Router } from "express";
import multer from "multer";
import path from "path"; // Importe o módulo 'path' do Node.js
import crypto from "crypto"; // (Opcional) Para gerar nomes de arquivo únicos
import { db } from "../database";
import bcrypt from "bcrypt";
import { listUserFiles } from "../controlers/FileControler";
import { authenticateToken } from "../middleware";

const router = Router();

// 1. Configuração do Storage com multer.diskStorage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // A pasta onde os arquivos serão salvos.
        // Recomendo usar um caminho absoluto para evitar problemas.
        cb(null, "api/uploads");
    },
    filename: (req, file, cb) => {
        // Aqui, nós customizamos o nome do arquivo.
        // Usamos o módulo 'path' para extrair a extensão do nome original do arquivo.
        const fileExtension = path.extname(file.originalname); [1, 2, 3, 4, 5]
        
        // (Opcional mas recomendado) Gera um nome de arquivo aleatório para evitar conflitos
        const randomName = crypto.randomBytes(16).toString("hex");

        // O nome final será: nomeAleatorio + .extensaoOriginal
        cb(null, `${randomName}${fileExtension}`);
    }
});

// 2. Inicialização do Multer com a configuração de storage
const upload = multer({ storage: storage });


// Rota raiz da api, base pra todas as outras rotas
router.get('/api/', (req, res) => {
    return res.send("ola");
});


// Rota com o Handler para o upload de arquivos do usuário
router.post("/api/upload", upload.single("archive"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File uploaded:", req.file);

    res.json({
        message: "Uploaded Successfully",
        filePath: `/api/uploads/${req.file.filename}`
    });
});


router.get('/api/files', authenticateToken, listUserFiles);

router.get("/api/uploads", (req, res) => {
    return res.send("foo bar");
});

// rota de cadastro de user
router.post("/api/register", async (req, res) => {
    try {
        const { username, password, is_admin } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "username e password são obrigatórios" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users_tb (username, password, is_admin)
            VALUES (?, ?, ?)
        `;

        const [result]: any = await db.query(sql, [
            username,
            hashedPassword,
            is_admin ?? 0
        ]);

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user_id: result.insertId
        });

    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
});

// Rota de debug
router.get("/api/dev/getallusers", async(req, res)=>{
    try{
        const sql = `
            SELECT * FROM users_tb;
        `
        const [result]: any = await db.query(sql);

         return res.status(200).json({
            result
        });
    }
    catch (err){
        console.error(err);
    }
})

export { router };
