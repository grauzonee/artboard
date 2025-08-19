import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
export interface FilterItem {
    originalField?: string,
    operand: 'eq' | 'gte' | 'lte' | 'in',
    isId?: boolean
}
export interface FilterList {
    fields: Record<string, FilterItem>[];
}
export const TimeFilter: FilterList = {
    fields: [
        {
            createdAtFrom: {
                originalField: 'createdAt',
                operand: 'gte'
            }
        },
        {
            createdAtTill: {
                originalField: 'createdAt',
                operand: 'lte'
            }
        },
    ]
}

export type FilterValue = Record<string, string | mongoose.Types.ObjectId | mongoose.Types.ObjectId[]>

export const filterMiddleware = (filterList: FilterList) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const filter: Record<string, FilterValue> = {};
        const query = req.query;
        filterList.fields.forEach((filterMap) => {
            Object.entries(filterMap).forEach(([key, filterItem]) => {
                if (!query[key]) {
                    return;
                }
                try {
                    const filterValue = filterItem.isId ? new mongoose.Types.ObjectId(query[key] as string) : query[key] as string;
                    const fieldName = filterItem.originalField ?? key;
                    if (typeof (filterValue) === 'string' && !filterItem.isId && filterItem.operand === 'eq') {
                        filter[fieldName] = { $regex: filterValue, $options: 'i' };
                        return;
                    }
                    const operand = '$' + filterItem.operand;
                    const filterBody = { ... (filter[fieldName] || {}), [operand]: filterValue };
                    filter[fieldName] = filterBody;
                } catch (error) {
                    res.status(400).json({ success: false, message: error instanceof Error ? error.message : error })
                    return;
                }
            })
        });
        req.dbFilter = filter;
        next();
    }
}

