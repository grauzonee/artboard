import { Response, Request } from 'express'
import { IUser, User } from "@models/User"
import { getUserByToken } from '@helper/auth/utils';

export async function updateUser(req: Request, res: Response) {
    try {
        await validateUpdateData(req);
    } catch (error) {
        return res.status(400).json({ success: false, message: error instanceof Error ? error.message : error });
    }
    const requestData = req.body;
    if (requestData === undefined) {
        return res.status(401).json({ success: false, message: "Empty body is not allowed" });
    }
    try {
        const user = await req.user?.updateProfile(requestData);
        return res.status(200).json({ success: true, data: user ? user.toJSON() : null });
    } catch (error) {
        return res.status(401).json({ success: false, message: error instanceof Error ? error.message : error });
    }
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

export async function updatePassword(req: Request, res: Response) {
    const requestData = req.body;
    try {
        await req.user?.updatePassword(requestData);
        return res.status(200).json({ success: true, message: "Password has been updated" });
    } catch (error) {
        return res.status(401).json({ success: false, message: error instanceof Error ? error.message : error });
    }
}

async function validateUpdateData(req: Request) {
    const requestData = req.body;
    // Username is free
    if (requestData.username) {
        const username = requestData.username;
        const userExistsUsername = await User.findOne({ username });
        if (userExistsUsername && userExistsUsername.id != req.user?.id) {
            throw Error("Username already in use!");
        }
    }
    // Birthdate is a valid date
    if (requestData.birthdate) {
        const birthdate = new Date(requestData.birthdate);
        const currentDate = new Date();
        birthdate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        if (isNaN(birthdate.getTime()) || birthdate > currentDate) {
            throw new Error("Invalid birthdate")
        }
    }
}

