import { Router, Request, Response } from 'express';
import { getPosts, createPost } from '../controllers/postController';
import { authMiddleware } from '../middleware/authMiddleware';
import { schemaValidation } from '../middleware/schemaValidation';
import { filterMiddleware } from '../middleware/filterMiddleware';
import { postFilterList } from '../filters/postFilter';
import { sortMiddleware } from '../middleware/sortMiddleware';
import { CreateSchema } from '../schemas/postSchemas';
import { Post } from '../models/Post';

export const router = Router();

router.get(
    '/all',
    [authMiddleware,
        filterMiddleware(postFilterList),
        sortMiddleware(Post)],
    async (req: Request, res: Response) => { await getPosts(req, res) }
);
router.post('/create', [authMiddleware, schemaValidation(CreateSchema)], async (req: Request, res: Response) => { await createPost(req, res) });
