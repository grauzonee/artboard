import { User } from '@models/User';
import { generateToken } from '@helper/auth/utils';
import { Response, Request } from 'express';



export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const userExistsEmail = await User.findOne({ email });
    if (userExistsEmail) {
        return res.status(400).json({ success: false, data: { message: "Email already in use", fields: ['email'] } });
    }
    const userExistsUsername = await User.findOne({ username });
    if (userExistsUsername) {
        return res.status(400).json({ success: false, data: { message: "Username already in use", fields: ['username'] } });
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
        return res.status(400).json({ success: false, data: { message: "Invalid user data", fields: [] } });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, data: { message: "Invalid email", fields: ['email'] } });
    }

    if (await user.matchPassword(password)) {
        const token = generateToken(user._id);
        const responseData = { ...user.toJSON(), token: token };
        return res.status(200).json({ success: true, data: responseData });
    }
    return res.status(400).json({ success: false, data: { message: "Invalid password", fields: ['password'] } });
}
