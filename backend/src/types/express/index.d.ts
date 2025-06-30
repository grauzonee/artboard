import { IUser } from '../../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: IUser,
            dbFilter: Record<string, any>,
            dbSort: Record<string, any>
        }
    }
}
