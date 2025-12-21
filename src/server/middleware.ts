
// Exemplo de um arquivo de middleware: /middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Estendendo a interface Request do Express para incluir o usuário
export interface AuthenticatedRequest extends Request {
  user?: {
    id: number; // ou string, dependendo do seu banco
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Anexa o payload do token (que deve conter o ID) ao request
        next();
    });
};
