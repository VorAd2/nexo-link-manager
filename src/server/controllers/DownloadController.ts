
import { Request, Response } from 'express';
import path from 'path';
import { dbConnection } from '../../db/mariaDB';

interface AuthenticatedRequest extends Request {
    user?: {
        id: number; // O ID do usuário logado
    };
}


export const downloadFile = async (req: AuthenticatedRequest, res: Response) => {
    const { filename } = req.params;
    const userId = req.user?.id; 

    if (!userId) {
        return res.status(401).send("Não autorizado.");
    }

    try {
        const sql = 'SELECT path FROM files_tb WHERE filename = ? AND user_id = ?';
        const [rows] = await dbConnection.execute(sql, [filename, userId]);
        
        const fileRecord = (rows as any)[0];

        if (!fileRecord) {
            return res.status(404).send("Arquivo não encontrado ou acesso negado.");
        }

        // definir o diretório base onde seus arquivos são salvos.
        const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads'); //  AJUSTAR ESTE CAMINHO!
        const fullPath = path.join(UPLOADS_DIR, fileRecord.path);
        
        res.download(fullPath, filename, (err) => {
            if (err) {
                if (res.headersSent) {
                    return;
                }
                console.error("Erro ao enviar arquivo:", err);
                res.status(500).send("Erro ao processar o download.");
            }
        });

    } catch (error) {
        console.error('Erro no processo de download:', error);
        res.status(500).send("Erro interno do servidor.");
    }
};
