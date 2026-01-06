import express from 'express';
import multer from 'multer';
import { router } from './routes';

const server = express();

// Middleware para JSON
server.use(express.json());

// Middleware para URL-encoded (form de HTML)
server.use(express.urlencoded({ extended: true }));

// Suas rotas
server.use(router);

export { server };
