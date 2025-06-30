import { User, IUser } from '../models/User';
import { generateToken, getUserByToken } from '../helper/auth/utils';
import { Response, Request } from 'express';



export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const userExistsEmail = await User.findOne({ email });
    if (userExistsEmail) {
        return res.status(400).json({ success: false, message: "Email already in use" });
    }
    const userExistsUsername = await User.findOne({ username });
    if (userExistsUsername) {
        return res.status(400).json({ success: false, message: "Username already in use" });
    }
    const user = await User.create({ username, email, password });

    if (user) {
        const token = generateToken(user._id);
        const userJSON = user.toJSON();
        const responseData = { ...userJSON, token };
        return res.status(201).json(
            { success: true, data: responseData }
        );
    } else {
        return res.status(400).json({ success: false, message: "Invalid user data" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (await user.matchPassword(password)) {
        const token = generateToken(user._id);
        const responseData = { ...user.toJSON(), token: token };
        return res.status(200).json({ success: true, data: responseData });
    }
    return res.status(400).json({ success: false, message: "Invalid password" });
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
