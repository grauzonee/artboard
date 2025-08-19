import { Router, Request, Response } from 'express';
import { like, getLikedPosts } from '@controllers/likeController';
import { authMiddleware } from '../middleware/authMiddleware';

export const router = Router();

router.put(
    '/posts/:id',
    authMiddleware,
    async (req: Request, res: Response) => { await like(req, res) }
);
router.get(
    '/posts',
    authMiddleware,
    async (req: Request, res: Response) => { await getLikedPosts(req, res) }
);

