import { Router, Request, Response } from 'express';
import { getPosts, createPost, deletePost, getById, updatePost } from '../controllers/postController';
import { authMiddleware } from '../middleware/authMiddleware';
import { schemaValidation } from '../middleware/schemaValidation';
import { filterMiddleware } from '../middleware/filterMiddleware';
import { postFilterList } from '../filters/postFilter';
import { sortMiddleware } from '../middleware/sortMiddleware';
import { CreateSchema, UpdateSchema } from '../schemas/postSchemas';
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

router.get('/:id', authMiddleware, async (req: Request, res: Response) => { await getById(req, res) });

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => { await deletePost(req, res) });

router.put('/:id', [authMiddleware, schemaValidation(UpdateSchema)], async (req: Request, res: Response) => { await updatePost(req, res) });
