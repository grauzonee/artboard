import { getConfigValue } from '../configHelper';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (id: string) => {
    const jwtSecret = getConfigValue('JWT_SECRET');
    return jsonwebtoken.sign({ id }, jwtSecret, { 'expiresIn': '1h' });
}

export const verifyToken = (token: string): JwtPayload => {
    try {
        return jsonwebtoken.verify(token, getConfigValue('JWT_SECRET')) as JwtPayload;
    } catch (err) {
        throw Error("Not authorized");
    }
}
