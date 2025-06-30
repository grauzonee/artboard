import { Router, Request, Response } from 'express';
import { getPosts, createPost } from '../controllers/postController';
import { authMiddleware } from '../middleware/authMiddleware';
import { schemaValidation } from '../middleware/schemaValidation';
import { CreateSchema } from '../schemas/postSchemas';

export const router = Router();

router.get('/all', authMiddleware, async (req: Request, res: Response) => { await getPosts(req, res) });
router.post('/create', [authMiddleware, schemaValidation(CreateSchema)], async (req: Request, res: Response) => { await createPost(req, res) });
