import { Response } from 'express'
import { IUser } from "@models/User"
import { getUserByToken } from '@helper/auth/utils';
import { AuthRequest } from '@controllers/authController';

export async function updateUser(req: AuthRequest, res: Response) {
    const requestData = req.body;
    if (requestData === undefined) {
        return res.status(401).json({ success: false, message: "Empty body is not allowed" });
    }
    try {
        const user = await req.user.updateProfile(requestData);
        return res.status(200).json({ success: true, data: user.toJSON() });
    } catch (error) {
        return res.status(401).json({ success: false, message: error instanceof Error ? error.message : error });
    }
}

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user: IUser = await getUserByToken(req);
        res.status(200).json(
            { success: true, data: user.toJSON() }
        );
    } catch (error) {
        return res.status(401).json({ success: false, message: error });
    }
}

export async function updatePassword(req: AuthRequest, res: Response) {
    const requestData = req.body;
    try {
        await req.user.updatePassword(requestData);
        return res.status(200).json({ success: true, message: "Password has been updated" });
    } catch (error) {
        return res.status(401).json({ success: false, message: error instanceof Error ? error.message : error });
    }
}
