import { Router } from "express";
import multer from "multer";
import path from "path"; // Importe o módulo 'path' do Node.js
import crypto from "crypto"; // (Opcional) Para gerar nomes de arquivo únicos

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

    // Agora req.file contém informações mais detalhadas, incluindo o 'filename' que você definiu
    console.log("File uploaded:", req.file);

    // Você pode retornar o caminho do arquivo ou um ID para o frontend
    res.json({
        message: "Uploaded Successfully",
        filePath: `/api/uploads/${req.file.filename}`
    });
});


// Rota com os arquivos dos uploads, ainda em desenvolvimento
router.get("/api/uploads", (req, res) => {
    return res.send("foo bar");
});

export { router };
