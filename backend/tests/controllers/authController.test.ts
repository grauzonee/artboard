import { registerUser, loginUser } from '../../src/controllers/authController';
jest.mock('../../src/models/User');
import { IUser, User } from '../../src/models/User';
import { Request, Response } from 'express';

jest.mock('../../src/helper/auth/utils', () => ({
    generateToken: jest.fn().mockReturnValue('some_token'),
    verifyToken: jest.fn(),
    getUserByToken: jest.fn()
}));
import { generateToken, getUserByToken, verifyToken } from '../../src/helper/auth/utils';

const ORIGINAL_ENV = process.env;
beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV, JWT_SECRET: 'test-secret' };
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

afterEach(() => {
    process.env = ORIGINAL_ENV;
});
const createdAt = new Date();
const resolvedUser = {
    _id: 'hss123',
    username: "test",
    password: "password123",
    email: "test123@gmail.com",
    createdAt: createdAt,
    updatedAt: createdAt,
    toJSON: jest.fn()
};

describe("registerUser function", () => {
    let req: Request;
    let res: Response;
    beforeEach(() => {
        req = {
            body: {
                username: "test", password: "password123", email: "test123@gmail.com"
            }
        } as any;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
    });
    test("should not call User.create when user exists", async () => {
        (User.findOne as jest.Mock).mockResolvedValue(resolvedUser);
        await registerUser(req, res);

        expect(User.create).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Email already in use" });
    });
    test("should call User.create when registering", async () => {
        (User.create as jest.Mock).mockResolvedValue(resolvedUser);
        (generateToken as jest.Mock).mockReturnValue('test_token');
        await registerUser(req, res);
        expect(User.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: expect.objectContaining({
                id: resolvedUser._id,
                username: resolvedUser.username,
                email: resolvedUser.email,
                token: expect.any(String),
                createdAt: createdAt.toJSON(),
                name: null,
                surname: null,
                country: null,
                city: null,
                birthdate: null,
            })
        });
    });
    test("should return error if user was not created", async () => {
        (User.create as jest.Mock).mockResolvedValue(null);
        (User.findOne as jest.Mock).mockResolvedValue(null);

        await registerUser(req, res);
        expect(User.findOne).toHaveBeenCalledTimes(2);
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid user data" });
    });

});

// Login user
describe("loginUser function", () => {
    let req: Request;
    let res: Response;
    beforeEach(() => {
        req = {
            body: {
                password: "password123", email: "test123@gmail.com"
            }
        } as any;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
    });
    test("should call generateToken when data are correct", async () => {
        const mockedUserObject = {
            ...resolvedUser,
            matchPassword: jest.fn().mockResolvedValue(true)
        };
        (generateToken as jest.Mock).mockReturnValue('test_token');
        (User.findOne as jest.Mock).mockResolvedValue(mockedUserObject);
        await loginUser(req, res);
        expect(generateToken).toHaveBeenCalledTimes(1);
        expect(mockedUserObject.matchPassword).toHaveBeenCalledTimes(1);
        expect(generateToken).toHaveBeenCalledWith(mockedUserObject._id)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: expect.objectContaining({
                id: mockedUserObject._id,
                username: mockedUserObject.username,
                email: mockedUserObject.email,
                token: expect.any(String),
                createdAt: createdAt.toJSON(),
                name: null,
                surname: null,
                country: null,
                city: null,
                birthdate: null,
            })
        });
    });
    test("should return 404 when password is incorrect", async () => {
        const mockedUserObject = {
            ...resolvedUser,
            matchPassword: jest.fn().mockResolvedValue(false)
        };
        (User.findOne as jest.Mock).mockResolvedValue(mockedUserObject);
        await loginUser(req, res);
        expect(mockedUserObject.matchPassword).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid password" });
    });
    test("should return 404 when email is incorrect", async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);
        await loginUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid email" });
    });
})
// Get profile
