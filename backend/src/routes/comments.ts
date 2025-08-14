import { Router, Request, Response } from 'express';
import { getComments, getCommentById, createComment, deleteComment, updateComment } from '../controllers/commentController';
import { authMiddleware } from '../middleware/authMiddleware';
import { schemaValidation } from '../middleware/schemaValidation';
import { filterMiddleware } from '../middleware/filterMiddleware';
import { CreateSchema, UpdateSchema } from '../schemas/commentSchemas';
import { commentFilter } from '../filters/commentFilter';
import { sortMiddleware } from '../middleware/sortMiddleware';
import { Comment } from '@models/Comment';

export const router = Router();

router.get(
    '/all',
    [authMiddleware, filterMiddleware(commentFilter), sortMiddleware(Comment)],
    async (req: Request, res: Response) => {
        await getComments(req, res)
    }
);
router.post(
    '/create',
    [authMiddleware, schemaValidation(CreateSchema)],
    async (req: Request, res: Response) => {
        await createComment(req, res)
    }
);
router.get('/:id', authMiddleware, async (req: Request, res: Response) => { await getCommentById(req, res) });
router.put(
    '/:id',
    [authMiddleware, schemaValidation(UpdateSchema)],
    async (req: Request, res: Response) => {
        await updateComment(req, res)
    }
);
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => { await deleteComment(req, res) });
