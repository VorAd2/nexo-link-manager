import express from 'express';
import multer from 'multer';
import cors from "cors";
import { router } from './routes';

const server = express();
server.use(cors({
  origin: "http://localhost:3000", // NextJS
  credentials: true
}));
// Middleware para JSON
server.use(express.json());

// Middleware para URL-encoded (form de HTML)
server.use(express.urlencoded({ extended: true }));

// Suas rotas
server.use(router);

export { server };
