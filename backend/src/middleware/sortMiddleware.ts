import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';


export const sortMiddleware = (entity: { getSortableFields(): string[] }) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { sortByDesc, sortByAsc } = req.query;

        if (sortByDesc && sortByAsc) {
            res.status(400).json({ success: false, message: "it is not possible to define sortByDesc and sortByAsc at the same time!" });
            return;
        }
        const sortedField = (sortByDesc ?? sortByAsc) as string | undefined;
        if (!sortedField || typeof sortedField !== 'string' || !entity.getSortableFields()?.includes(sortedField)) {
            next();
            return;
        }
        const sortOrder = sortByDesc ? -1 : 1;
        req.dbSort = { [sortedField]: sortOrder };
        next();
    }
}


