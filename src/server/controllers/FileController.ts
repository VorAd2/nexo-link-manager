// src/controllers/fileController.ts
import { Request, Response } from 'express';
import { dbConnection } from '../../db/mariaDB';
import { FileRecord, FileLink } from '../type/file.js';


interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
    };
}

/**
 * Controlador para listar os arquivos de um usuário logado.
 */
export const listUserFiles = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
       
        return res.status(401).json({ error: 'Não autorizado. Usuário não logado.' });
    }

    try {
  
        const sql = 'SELECT id, filename, path FROM files_tb WHERE user_id = ?';
        
      
        const [rows] = await dbConnection.execute(sql, [userId]);
        
       
        const files = rows as FileRecord[];

     
        const fileLinks: FileLink[] = files.map(file => ({
            id: file.id,
            name: file.filename,
   
            downloadLink: `/api/download/${file.filename}` 
        }));

        res.json({
            message: `Arquivos encontrados para o usuário ${userId}`,
            files: fileLinks
        });

    } catch (error) {
        console.error('Erro ao buscar arquivos do usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar arquivos.' });
    }
};
