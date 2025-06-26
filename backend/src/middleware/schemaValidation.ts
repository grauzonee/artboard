import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const schemaValidation = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if (error) {
            const message = error.details.map(i => i.message).join(',');
            res.status(400).json({ success: false, message: message });
            return;
        }
        next();
    }
}
