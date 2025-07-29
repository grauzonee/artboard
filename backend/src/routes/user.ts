import { Router, Request, Response } from 'express';
import { authMiddleware } from '@middleware/authMiddleware';
import { schemaValidation } from '@middleware/schemaValidation';
import { UpdateProfileSchema, UpdatePasswordSchema } from '@schemas/userSchemas';
import { updateUser, getProfile, updatePassword } from '@controllers/userController'


export const router = Router();
router.get('/', authMiddleware, async (req: Request, res: Response) => { getProfile(req, res) });

router.put('/', [authMiddleware, schemaValidation(UpdateProfileSchema)], async (req: Request, res: Response) => { updateUser(req, res) });
router.put('/password', [authMiddleware, schemaValidation(UpdatePasswordSchema)], async (req: Request, res: Response) => { updatePassword(req, res) });
