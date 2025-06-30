"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../../src/controllers/authController");
jest.mock('../../src/models/User');
const User_1 = require("../../src/models/User");
jest.mock('../../src/helper/auth/utils', () => ({
    generateToken: jest.fn().mockReturnValue('some_token'),
    verifyToken: jest.fn()
}));
const utils_1 = require("../../src/helper/auth/utils");
const ORIGINAL_ENV = process.env;
beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
    process.env = Object.assign(Object.assign({}, ORIGINAL_ENV), { JWT_SECRET: 'test-secret' });
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
    toJSON: jest.fn().mockReturnValue({
        id: 'hss123',
        username: "test",
        password: "password123",
        email: "test123@gmail.com",
        createdAt: createdAt.toJSON(),
        updatedAt: createdAt.toJSON(),
    })
};
describe("registerUser function", () => {
    let req;
    let res;
    beforeEach(() => {
        req = {
            body: {
                username: "test", password: "password123", email: "test123@gmail.com"
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    test("should not call User.create when user exists", () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.User.findOne.mockResolvedValue(resolvedUser);
        yield (0, authController_1.registerUser)(req, res);
        expect(User_1.User.create).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Email already in use" });
    }));
    test("should call User.create when registering", () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.User.create.mockResolvedValue(resolvedUser);
        utils_1.generateToken.mockReturnValue('test_token');
        yield (0, authController_1.registerUser)(req, res);
        expect(User_1.User.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: expect.objectContaining({
                id: resolvedUser._id,
                username: resolvedUser.username,
                email: resolvedUser.email,
                token: expect.any(String),
                createdAt: createdAt.toJSON()
            })
        });
    }));
    test("should return error if user was not created", () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.User.create.mockResolvedValue(null);
        User_1.User.findOne.mockResolvedValue(null);
        yield (0, authController_1.registerUser)(req, res);
        expect(User_1.User.findOne).toHaveBeenCalledTimes(2);
        expect(User_1.User.create).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid user data" });
    }));
});
// Login user
describe("loginUser function", () => {
    let req;
    let res;
    beforeEach(() => {
        req = {
            body: {
                password: "password123", email: "test123@gmail.com"
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    test("should call generateToken when data are correct", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockedUserObject = Object.assign(Object.assign({}, resolvedUser), { matchPassword: jest.fn().mockResolvedValue(true) });
        utils_1.generateToken.mockReturnValue('test_token');
        User_1.User.findOne.mockResolvedValue(mockedUserObject);
        yield (0, authController_1.loginUser)(req, res);
        expect(utils_1.generateToken).toHaveBeenCalledTimes(1);
        expect(mockedUserObject.matchPassword).toHaveBeenCalledTimes(1);
        expect(utils_1.generateToken).toHaveBeenCalledWith(mockedUserObject._id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: expect.objectContaining({
                _id: mockedUserObject._id,
                username: mockedUserObject.username,
                email: mockedUserObject.email,
                token: expect.any(String),
                createdAt: createdAt.toJSON()
            })
        });
    }));
    test("should return 404 when password is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockedUserObject = Object.assign(Object.assign({}, resolvedUser), { matchPassword: jest.fn().mockResolvedValue(false) });
        User_1.User.findOne.mockResolvedValue(mockedUserObject);
        yield (0, authController_1.loginUser)(req, res);
        expect(mockedUserObject.matchPassword).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid password" });
    }));
    test("should return 404 when email is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        User_1.User.findOne.mockResolvedValue(null);
        yield (0, authController_1.loginUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid email" });
    }));
});
// Get profile
describe("getProfile function", () => {
    test("should return profile when user was found", () => __awaiter(void 0, void 0, void 0, function* () {
        utils_1.getUserByToken.mockReturnValue(resolvedUser);
        let req = {
            headers: {
                authorization: "Bearer 24r32"
            }
        };
        let res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, authController_1.getProfile)(req, res);
        expect(utils_1.getUserByToken).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: expect.objectContaining({
                _id: resolvedUser._id,
                username: resolvedUser.username,
                email: resolvedUser.email,
                token: expect.any(String),
                createdAt: createdAt.toJSON()
            })
        });
    }));
});
