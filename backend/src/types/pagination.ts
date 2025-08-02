import { FilterValue } from '@middleware/filterMiddleware';
import { SortOrder } from 'mongoose';
import { Document, Model } from 'mongoose';

export interface PaginationOptions {
    page?: number;
    limit?: number;
    sort?: Record<string, SortOrder>,
    dbFilter?: Record<string, FilterValue>,
    populate?: string | string[]
}

export interface PaginationResult<T> {
    docs: T[];
    total: number;
    pages: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface Paginable<T extends Document> extends Model<T> {
    paginate: (
        filter?: Record<string, FilterValue>,
        options?: PaginationOptions
    ) => Promise<PaginationResult<T>>;
}
