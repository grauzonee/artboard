import { IUser } from '@models/User';
import { FilterValue } from '@middleware/filterMiddleware';
import { SortOrder } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            user?: IUser,
            dbFilter: Record<string, FilterValue>,
            dbSort: Record<string, SortOrder>
        }
    }
}
