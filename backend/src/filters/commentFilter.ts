import { FilterList, TimeFilter } from '../middleware/filterMiddleware';

export const commentFilter: FilterList = {
    fields: [
        ...TimeFilter.fields,
        {
            author: {
                isId: true
            }
        },
        {
            post: {
                isId: true
            }
        }
    ]
}
