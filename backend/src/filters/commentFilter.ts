import { FilterList, TimeFilter } from '../middleware/filterMiddleware';

export const commentFilter: FilterList = {
    fields: [
        ...TimeFilter.fields,
        {
            author: {
                isId: true,
                operand: 'eq'
            }
        },
        {
            post: {
                isId: true,
                operand: 'eq'
            }
        }
    ]
}
