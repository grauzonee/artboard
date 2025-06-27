import { Request, Response, NextFunction } from 'express';
import { verifyToken } from 'helper/auth/utils';

// Checks whether Bearer token is valid
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
        verifyToken(token);
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
}
