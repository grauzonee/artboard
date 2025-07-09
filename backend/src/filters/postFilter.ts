import { FilterList, TimeFilter } from '../middleware/filterMiddleware';

export const postFilterList: FilterList = {
    fields: [
        ...TimeFilter.fields,
        {
            author: {
                isId: true,
                operand: 'eq'
            }
        },
        {
            materials: {
                operand: 'in'
            }
        },
    ]
}
