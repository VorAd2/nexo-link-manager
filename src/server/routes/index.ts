import { Router } from "express";
import multer from "multer";
import path from "path"; // Importe o módulo 'path' do Node.js
import crypto from "crypto"; // (Opcional) Para gerar nomes de arquivo únicos
import { db } from "../database";
import bcrypt from "bcrypt";
import { existsSync } from "fs";

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
router.post("/api/upload", upload.single("archive"), async (req, res) => {

    let userExistsInDataBase = false;

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Pegando o ID do usuário
    const userID = req.body.userID;
    //console.log("user id: " + userID); // debug
    const querySql = 'SELECT id FROM users_tb WHERE id = (?)';
    const [result]: any = await db.query(querySql, [userID]);

    // verifica se o id do usuário existe no banco,
    // código porco? sim, mas tenho que rushar essa merda
    // por que um outro dev encheu essa porcaria de IA e quebrou
    // o código
    // Como sempre vem como array, verifico se o array está vazio
    // Se esse for o caso, não há usuário com id informado
    if(result.length != 0){userExistsInDataBase = true;}
    if(!userExistsInDataBase){return res.status(400).json({error: "Usuário inexistente"});}
    // agora adiciono as informações do arquivo na tabela files_tb
    const sqlInsert = 'INSERT INTO files_tb (owner_id, filename, download_link) VALUES (?, ?, ?)';
    // Foda-se a semântica
    try{
        const [resultOfInsert]: any = await db.query(sqlInsert, [
            userID,
            req.file.filename,
            // eu bem que poderia gerar um link direfente do nome do arquivo
            // Mas vou deixar essa porrra assim mesmo, o cara baixa o arquivo
            // Só inserindo o nome do arquivo na url
            req.file.filename 
    
        ]);
    }catch(err) {
        console.error("Erro ao realizar upload dos arquivos:", err);
        return res.status(500).json({ error: "Erro no upload dos arquivos, consulte o console" });
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
router.get("/api/uploads", async (req, res) => {
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

// rota pra download dos arquivos
router.get("/api/dev/getallfiles", async (require, res) =>{

    // Join básico que retorna o id do usuário, o nome e o link de download do arquivo (que é o mesmo nome do arquivo)
    // Se o usuário tiver N arquivos upados, ocorre duplicidade de dados, o ideal seria ser algo como
    /* [
            username: foo,
            id: 1,
            [
                download_link:  bar.png,
                download_link: foo2.zip
            ]
        ]
    */
    // Mas não ocorre assim
    const queryToGetAllFilenames =  `
            SELECT u.id AS user_id, u.username AS username, f.download_link
            FROM files_tb f
            JOIN users_tb u ON u.id = f.owner_id;
        `;
    const [files]: any = await db.query(queryToGetAllFilenames);

    return res.json({files});
});

// rota de debug
router.get("/api/dev/getallusers", async (req, res) =>{
    const query = 'SELECT * FROM users_tb';
    const [result]: any = await db.query(query);

    return res.json(result);
});

// mais uma rota de debug pro frontend

/* ===================================================================
    ESSA ROTA NÃO FUNCIONA, PROVAVELMENTE ALGUMA CONFIGURAÇÃO ERRADA
   ===================================================================
*/
// router.get("/api/dev/getallfiles/:id", async (require, res) =>{
    
//     const userID = require.params.id;

//     console.log(userID);

//     return res.json({id: userID});
    
//     // const query = 'SELECT * FROM users_tb';
//     // const [result]: any = await db.query(query);

//     // return res.json(result);
// });

export { router };
