import { Router } from "express";
import multer from "multer";

const router = Router();

const upload =  multer({dest: "/api/uploads"});


//Rota raiz da api, base pra todas as outras rotas
router.get('/api/', (req, res) => {
    return res.send("ola");
});


//Rota com o Handler para o upload de arquivos do usuário,
//pro handler funcionar é necessario que o upload venha do frontend
router.post("/api/upload", upload.single("archive") ,(req, res) =>
{
 if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("File uploaded", req.file);

  res.json({message: "Uploaded Successfully"});
})


//Rota com os arquivos dos uploads, ainda em desenvolvimento
router.get("/api/uploads"), (req, res) => {
    return res.
}

export {router};