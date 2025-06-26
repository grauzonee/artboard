import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { getConfigValue } from '../helper/configHelper';

// Checks whether Bearer token is valid
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
        jsonwebtoken.verify(token, getConfigValue('JWT_SECRET'));
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
}
