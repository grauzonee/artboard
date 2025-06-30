import { Router, Request, Response } from 'express';
import { upload, getImageUploadPath } from '../middleware/imageConfig';
import { authMiddleware } from '../middleware/authMiddleware';

export const router = Router();

router.post('/upload', [authMiddleware, upload.single('image')], function(req: Request, res: Response) {
    const requestData = {
        ...req.file,
        imageUrl: getImageUploadPath(req) + '/' + req.file?.filename
    }
    res.status(201).json({ success: true, data: requestData });
});
