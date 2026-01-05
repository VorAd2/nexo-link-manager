import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { router } from './routes';

const server = express();

// Middleware para JSON
server.use(express.json());

// Middleware para URL-encoded (form de HTML)
server.use(express.urlencoded({ extended: true }));

// Middleware para FORM-DATA (sem arquivos)
server.use(multer().none());

// Suas rotas
server.use(router);

export { server };
