import { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '@controllers/authController';
import { schemaValidation } from '@middleware/schemaValidation';
import { RegisterSchema, LoginSchema } from '@schemas/authSchemas';

export const router = Router();

router.post('/register', schemaValidation(RegisterSchema), async (req: Request, res: Response) => { await registerUser(req, res) });
router.post('/login', schemaValidation(LoginSchema), async (req: Request, res: Response) => { await loginUser(req, res) });

