import { Request, Response } from 'express'
import { IUser } from "@models/User"
import { getUserByToken } from '@helper/auth/utils';

export async function updateUser(req: Request, res: Response) {
    const requestData = req.body;
    if (requestData === undefined) {
        return res.status(401).json({ success: false, message: "Empty body is not allowed" });
    }
    if (!req.user) {
        return res.status(400).json({ success: false, message: "Unauthorized" });
    }
    const user = await req.user.updateProfile(requestData);
    return res.status(200).json({ success: true, data: user.toJSON() });
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const user: IUser = await getUserByToken(req);
        res.status(200).json(
            { success: true, data: user.toJSON() }
        );
    } catch (error) {
        return res.status(401).json({ success: false, message: error });
    }
}
