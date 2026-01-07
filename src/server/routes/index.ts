import { Router } from "express";
import multer from "multer";
import path from "path"; // Importe o módulo 'path' do Node.js
import crypto from "crypto"; // (Opcional) Para gerar nomes de arquivo únicos
import { dbConnection } from "../../db/mariaDB";
import bcrypt from "bcrypt";
import { existsSync } from "fs";

const router = Router();
const UPLOAD_DIR = path.join(process.cwd(), "api", "uploads");




// 1. Configuração do Storage com multer.diskStorage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // A pasta onde os arquivos serão salvos.
        // Recomendo usar um caminho absoluto para evitar problemas.
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        // Aqui, nós customizamos o nome do arquivo.
        // Usamos o módulo 'path' para extrair a extensão do nome original do arquivo.
        const fileExtension = path.extname(file.originalname);


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


// // Rota com o Handler para o upload de arquivos do usuário
// router.post("/api/upload", async (req, res, next) => {
//   if (!req.body.userID) {
//     return res.status(401).json({ error: "Usuário não autenticado" });
//   }
//   next();
// }, upload.single("archive"), async (req, res) => {


//     console.log("REQ BODY:", req.body);
//     console.log("USER ID RECEBIDO:", req.body.userID);

//     console.log("REQ FILE:", req.file);
//     let userExistsInDataBase = false;

//     if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Pegando o ID do usuário
//     const userID = req.body.userID;
//     //console.log("user id: " + userID); // debug
//     const querySql = 'SELECT id FROM users_tb WHERE id = (?)';
//     const [result]: any = await dbConnection.query(querySql, [userID]);

//     // verifica se o id do usuário existe no banco,
//     // código porco? sim, mas tenho que rushar essa merda
//     // por que um outro dev encheu essa porcaria de IA e quebrou
//     // o código
//     // Como sempre vem como array, verifico se o array está vazio
//     // Se esse for o caso, não há usuário com id informado
//     if (result.length != 0) { userExistsInDataBase = true; }
//     if (!userExistsInDataBase) { return res.status(400).json({ error: "Usuário inexistente" }); }
//     // agora adiciono as informações do arquivo na tabela files_tb
//     const sqlInsert = 'INSERT INTO files_tb (owner_id, filename, download_link) VALUES (?, ?, ?)';
//     // Foda-se a semântica
//     try {
//         const [resultOfInsert]: any = await dbConnection.query(sqlInsert, [
//             userID,
//             req.file.filename,
//             // eu bem que poderia gerar um link direfente do nome do arquivo
//             // Mas vou deixar essa porrra assim mesmo, o cara baixa o arquivo
//             // Só inserindo o nome do arquivo na url
//             req.file.filename

//         ]);
//     } catch (err) {
//         console.error("Erro ao realizar upload dos arquivos:", err);
//         return res.status(500).json({ error: "Erro no upload dos arquivos, consulte o console" });
//     }

//     // Agora req.file contém informações mais detalhadas, incluindo o 'filename' que você definiu
//     console.log("File uploaded:", req.file);

//     // Você pode retornar o caminho do arquivo ou um ID para o frontend
//     res.json({
//         message: "Uploaded Successfully",
//         filePath: `/api/uploads/${req.file.filename}`
//     });
// });
router.post(
  "/api/upload",
  upload.single("archive"),
  async (req, res) => {
    if (!req.body.userID) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }
console.log("BODY RAW:", req.body);
console.log("USER ID RAW:", req.body.userID);
console.log("USER ID NUMBER:", Number(req.body.userID));
console.log("REQ FILE:", req.file);

    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    const userID = Number(req.body.userID);

    const [result]: any = await dbConnection.query(
      "SELECT id FROM users_tb WHERE id = ?",
      [userID]
    );

    if (result.length === 0) {
      return res.status(400).json({ error: "Usuário inexistente" });
    }
    if (!req.file) {
  return res.status(400).json({ error: "Arquivo não enviado" });
}


    await dbConnection.query(
      "INSERT INTO files_tb (owner_id, filename, download_link) VALUES (?, ?, ?)",[userID, req.file.filename, req.file.filename]
    );
    const [insertResult]: any = await dbConnection.query(
  "INSERT INTO files_tb (owner_id, filename, download_link) VALUES (?, ?, ?)",
  [userID, req.file.filename, req.file.filename]
);
console.log("INSERT RESULT:", insertResult);
    return res.json({
      message: "Uploaded Successfully",
      filePath: `/api/uploads/${req.file.filename}`,
    });
  }
  
);


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

        const [result]: any = await dbConnection.query(sql, [
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

// rota de login
router.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // validação básica
        if (!username || !password) {
            return res.status(400).json({
                error: "username e password são obrigatórios"
            });
        }

        // busca o usuário pelo username
        const sql = `
            SELECT id, username, password, is_admin
            FROM users_tb
            WHERE username = ?
            LIMIT 1
        `;

        const [result]: any = await dbConnection.query(sql, [username]);

        // verifica se o usuário existe
        if (result.length === 0) {
            return res.status(401).json({
                error: "Usuário ou senha inválidos"
            });
        }

        const user = result[0];

        // compara a senha informada com o hash do banco
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Usuário ou senha inválidos"
            });
        }

        // login OK (sem JWT)
        return res.status(200).json({
            message: "Login realizado com sucesso",
            user: {
                id: user.id,
                username: user.username,
                is_admin: user.is_admin
            }
        });

    } catch (err) {
        console.error("Erro ao realizar login:", err);
        return res.status(500).json({
            error: "Erro interno no servidor"
        });
    }
});

// rota pra links dos arquivos
router.get("/api/dev/getallfiles", async (req, res) => {

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
    const queryToGetAllFilenames = `
            SELECT u.id AS user_id, u.username AS username, f.download_link
            FROM files_tb f
            JOIN users_tb u ON u.id = f.owner_id;
        `;
    const [files]: any = await dbConnection.query(queryToGetAllFilenames);

    return res.json({ files });
});

// rota para download dos arquivos
router.get("/api/downloadfile/:filename", async (req, res) => {

    try {
        const FOLDER_TO_FILES = '../../../api/uploads/';
        const filename = req.params.filename;

        const filepath = path.join(UPLOAD_DIR, filename);


        return res.download(filepath);

    } catch (err) {
        console.log(err);
    }

});

// rota de debug
router.get("/api/dev/getallusers", async (req, res) => {
    const query = 'SELECT * FROM users_tb';
    const [result]: any = await dbConnection.query(query);

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
