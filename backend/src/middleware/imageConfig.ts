import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import fs from 'fs';

export const getImageUploadPath = (req: Request): string => {
    const userId = req.user?.id;
    const uploadPath = path.join(__dirname, '../../', 'uploads', userId);
    fs.mkdirSync(uploadPath, { recursive: true });
    return `uploads/${userId}/`;
}


export const upload = multer({
    storage: multer.diskStorage({
        destination: (req: Request, file, cb) => {

            cb(null, getImageUploadPath(req));
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
        }
    })
});
