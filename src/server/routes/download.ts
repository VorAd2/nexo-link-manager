// src/routes/downloadRoutes.ts
import { Router } from 'express';
import { downloadFile } from '../controllers/DownloadController';
import { authenticateToken } from '../middleware';

const router = Router();

/**
 * Rota: GET /api/download/:filename
 * Descrição: Permite que o usuário logado baixe um arquivo de sua propriedade.
 * Requer: Middleware de autenticação JWT.
 */
router.get('/api/download/:filename', authenticateToken, downloadFile);

export default router;
