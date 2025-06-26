import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/User';
import { getConfigValue } from '../helper/configHelper';
import { RequestHandler, Response, Request } from 'express';
import { JwtPayload, JsonWebTokenError } from 'jsonwebtoken';

export const generateToken = (id: string) => {
    const jwtSecret = getConfigValue('JWT_SECRET');
    return jsonwebtoken.sign({ id }, jwtSecret, { 'expiresIn': '1h' });
}

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }
    const user = await User.create({ username, email, password });

    if (user) {
        return res.status(201).json(
            { success: true, data: { _id: user.id, username: user.username, email: user.email, token: generateToken(user.id) } }
        );
    } else {
        return res.status(400).json({ success: false, message: "Invalid user data" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: "Invalid email" });
    }

    if (await user.matchPassword(password)) {
        return res.status(200).json({ success: true, data: { _id: user.id, username: user.username, email: user.email, token: generateToken(user.id) } });
    }
    return res.status(404).json({ success: false, message: "Invalid password" });
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const token: string = req.headers.authorization?.replace('Bearer ', '') ?? '';
        const decoded = jsonwebtoken.verify(token, getConfigValue('JWT_SECRET')) as JwtPayload;
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ success: false, message: "Not authorized" });
        }
        res.status(200).json(
            { success: true, data: { _id: user.id, username: user.username, email: user.email, token: token } }
        );
    } catch (error) {
        if (error instanceof JsonWebTokenError) {

            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        return res.status(401).json({ success: false, message: error });
    }
}
