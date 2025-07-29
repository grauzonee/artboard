import { Request, Response, NextFunction } from 'express';
import { getUserByToken } from '../helper/auth/utils';
import { IUser } from '../models/User';

// Checks whether Bearer token is valid
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    try {
        const user: IUser = await getUserByToken(req);
        req.user = user;
        next();
    } catch {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
} 
