import { Router, Request, Response } from 'express';
import { like } from '@controllers/likeController';
import { authMiddleware } from '../middleware/authMiddleware';

export const router = Router();

router.put(
    '/post/:id',
    authMiddleware,
    async (req: Request, res: Response) => { await like(req, res) }
);

