import { Router, Request, Response } from 'express';
import { authMiddleware } from '@middleware/authMiddleware';
import { schemaValidation } from '@middleware/schemaValidation';
import { UpdateProfileSchema } from '@schemas/userSchemas';
import { updateUser, getProfile } from '@controllers/userController'


export const router = Router();
router.get('/', authMiddleware, async (req: Request, res: Response) => { getProfile(req, res) });

router.put('/', [authMiddleware, schemaValidation(UpdateProfileSchema)], async (req: Request, res: Response) => { updateUser(req, res) });
