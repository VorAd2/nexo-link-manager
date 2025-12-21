// src/controllers/loginController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dbConnection } from '../../db/mariaDB'; 
import { UserRecord } from '../type/user';


export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
    }

    try {
        
        const sql = 'SELECT id, username, password_hash FROM users_tb WHERE username = ?';
        const [rows] = await dbConnection.execute(sql, [username]);
        
      
        const user = (rows as UserRecord[])[0];

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

  
        const payload = { id: user.id };
        const secret = process.env.JWT_SECRET as string;
        

        const token = jwt.sign(payload, secret, { expiresIn: '1h' });


        res.json({
            message: 'Login bem-sucedido',
            token: token,
            user: {
                id: user.id,
                username: user.username
            }
        });

    } catch (error) {
        console.error('Erro no processo de login:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
