import { FilterList } from '../middleware/filterMiddleware';

export const postFilterList: FilterList = {
    fields: [
        {
            id: {
                originalField: '_id'
            }
        },
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
        {
            author: {
                isId: true
            }
        },
        {
            materials: {
                operand: 'in'
            }
        },
    ]
}
