import { Schema, Document } from 'mongoose';
import { PaginationOptions, PaginationResult } from 'types/pagination';
import { FilterValue } from '@middleware/filterMiddleware';

export function mongoosePagination<T extends Document>(schema: Schema<T>) {
    schema.statics.paginate = async function(filter: Record<string, FilterValue> = {}, options: PaginationOptions = {}): Promise<PaginationResult<T>> {
        const {
            page: rawPage = 1,
            limit: rawLimit = 10,
            populate,
            sort,
            ...query
        } = options;

        const page = Math.max(1, rawPage) || 1;
        const limit = Math.max(1, rawLimit) || 1;

        const skip = (page - 1) * limit;

        let queryBuilder = this.find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort);
        if (populate) {
            if (Array.isArray(populate)) {
                populate.forEach(populateOption => {
                    queryBuilder = queryBuilder.populate(populateOption);
                });
            } else {
                queryBuilder = queryBuilder.populate(populate);
            }
        }

        const [docs, total] = await Promise.all([
            queryBuilder.exec(),
            this.countDocuments({ ...filter, ...query }).exec(),
        ]);

        const pages = Math.ceil(total / limit);
        const hasNext = page < pages;
        const hasPrev = page > 1;

        return {
            docs,
            total,
            pages,
            page,
            limit,
            hasNext,
            hasPrev,
        };
    }
}
