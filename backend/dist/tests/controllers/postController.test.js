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
const postController_1 = require("../../src/controllers/postController");
jest.mock('../../src/models/Post');
const Post_1 = require("../../src/models/Post");
beforeEach(() => {
    jest.resetAllMocks();
});
describe("getPosts function", () => {
    test("return empty array when there are no posts", () => { });
    test("return posts", () => { });
});
describe("createPost function", () => {
    test("return post when all the data is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                title: "Trying out oil pastels",
                content: "This image was drawn today...",
                imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
                materials: ["oil pastels"],
            },
            user: {
                _id: "authorId"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const createdAt = Date();
        Post_1.Post.create.mockResolvedValue({
            _id: "someId",
            title: "Trying out oil pastels",
            content: "This image was drawn today...",
            imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
            materials: ["oil pastels"],
            author: "authorId",
            createdAt: createdAt
        });
        yield (0, postController_1.createPost)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: expect.objectContaining({
                id: "someId",
                title: "Trying out oil pastels",
                content: "This image was drawn today...",
                imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
                materials: ["oil pastels"],
                author: "authorId",
                createdAt: createdAt
            })
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(Post_1.Post.create).toHaveBeenCalledTimes(1);
        expect(Post_1.Post.create).toHaveBeenCalledWith({
            title: "Trying out oil pastels",
            content: "This image was drawn today...",
            imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
            materials: ["oil pastels"],
            author: "authorId"
        });
    }));
    test("return error when no user is attached", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                title: "Trying out oil pastels",
                content: "This image was drawn today...",
                imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
                materials: ["oil pastels"],
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        yield (0, postController_1.createPost)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: expect.any(String) });
    }));
});
