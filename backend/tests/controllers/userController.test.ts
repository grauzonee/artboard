import { getProfile, updateUser } from '@controllers/userController'
import { getUserByToken } from '@helper/auth/utils';
import { IUser, User } from '@models/User';
import { Request, Response } from 'express';
import { checkImage } from '@controllers/mediaController';
jest.mock('@controllers/mediaController');

const ORIGINAL_ENV = process.env;
afterEach(() => {
    process.env = ORIGINAL_ENV;
});
jest.mock('../../src/helper/auth/utils', () => ({
    getUserByToken: jest.fn()
}));
const createdAt = new Date();
const resolvedUser = {
    _id: 'hss123',
    username: "test",
    password: "password123",
    email: "test123@gmail.com",
    createdAt: createdAt,
    updatedAt: createdAt,
    name: null,
    city: null,
    country: null,
    surname: null,
    toJSON: jest.fn(),
    updateProfile: jest.fn(),

};
beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV, JWT_SECRET: 'test-secret', HOST: 'http://localhost:3000' };
    (resolvedUser.toJSON as jest.Mock).mockReturnValue({
        id: 'hss123',
        username: "test",
        email: "test123@gmail.com",
        createdAt: createdAt.toJSON(),
        name: null,
        surname: null,
        country: null,
        city: null,
        birthdate: null,
    })

});
describe("getProfile function", () => {
    test("should return profile when user was found", async () => {
        (getUserByToken as jest.Mock).mockReturnValue(resolvedUser);

        let req: Request = {
            headers: {
                authorization: "Bearer 24r32"
            }
        } as any;
        let res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        await getProfile(req, res);
        expect(getUserByToken).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: {
                id: resolvedUser._id,
                username: resolvedUser.username,
                email: resolvedUser.email,
                createdAt: createdAt.toJSON(),
                name: null,
                surname: null,
                country: null,
                city: null,
                birthdate: null,
            }
        });
    });
});

describe("updateProfile function", () => {
    test("should return 401 on empty body", async () => {
        let req: Request = {
            headers: {
                authorization: "Bearer 123"
            },
            body: undefined,

        } as any;
        let res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Empty body is not allowed" });
    })
    test("should return 200 on successfull update name", async () => {
        const mockUser = new User({
            username: 'test',
            email: 'test@test.com',
            password: 'hashed',
        });
        (getUserByToken as jest.Mock).mockReturnValue(mockUser);
        mockUser.save = jest.fn().mockResolvedValue(mockUser);
        let req: Request = {
            headers: {
                authorization: "Bearer 123"
            },
            body: { name: "Karina" },
            user: mockUser
        } as any;
        let res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await updateUser(req, res);
        expect(mockUser.name).toBe("Karina");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUser.toJSON() });
    })
    test("should return 401 if avatar doesn't exist", async () => {
        const mockUser = new User({
            username: 'test',
            email: 'test@test.com',
            password: 'hashed',
        });
        (getUserByToken as jest.Mock).mockReturnValue(mockUser);
        let req: Request = {
            headers: {
                authorization: "Bearer 123"
            },
            body: { avatar: "Karina" },
            user: mockUser
        } as any;
        let res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid avatar, image doesn't exist" });
    })
    test("should return 200 if avatar exists", async () => {
        const mockUser = new User({
            username: 'test',
            email: 'test@test.com',
            password: 'hashed',
        });
        (getUserByToken as jest.Mock).mockReturnValue(mockUser);
        mockUser.save = jest.fn().mockResolvedValue(mockUser);
        (checkImage as jest.Mock).mockReturnValue(true);

        let req: Request = {
            headers: {
                authorization: "Bearer 123"
            },
            body: { avatar: "Karina" },
            user: mockUser
        } as any;
        let res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await updateUser(req, res);
        expect(checkImage).toHaveBeenCalledTimes(1);
        expect(mockUser.avatar).toBe("Karina");

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUser.toJSON() });
    })
    test("should return 400 when unauthorized", async () => {
        let req: Request = {
            headers: {
                authorization: "Bearer 123"
            },
            body: { name: "Karina" },
        } as any;
        let res: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Unauthorized" });
    })
})

