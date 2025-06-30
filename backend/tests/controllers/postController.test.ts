import { createPost, getPosts } from '../../src/controllers/postController';
jest.mock('../../src/models/Post');
import { Post } from '../../src/models/Post';
import { Request, Response } from 'express';

const createdAt = Date();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("getPosts function", () => {
    test("return empty array when there are no posts", async () => {
        (Post.find as jest.Mock).mockReturnValue({
            populate: jest.fn().mockReturnValue([])
        });
        const req = {} as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        await getPosts(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: []
        });
    });
    test("return posts", async () => {
        const postCollection = [{
            id: "post_id",
            title: "post-title",
            imageUrl: "image-url",
            author: {
                id: "author-id",
                username: "author-username"
            },
            createdAt: createdAt,
            updatedAt: createdAt
        }];
        (Post.find as jest.Mock).mockReturnValue({
            populate: jest.fn().mockReturnValue(postCollection)
        });
        const req = {} as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        await getPosts(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: postCollection
        });
    });
});

describe("createPost function", () => {
    test("return post when all the data is correct", async () => {
        const req = {
            body: {
                title: "Trying out oil pastels",
                content: "This image was drawn today...",
                imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
                materials: ["oil pastels"],
            },
            user: {
                _id: "authorId",
                populate: jest.fn().mockReturnValue({
                    _id: "someId",
                    title: "Trying out oil pastels",
                    content: "This image was drawn today...",
                    imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
                    materials: ["oil pastels"],
                    author: {
                        id: expect.any(String),
                        usiername: expect.any(String),
                    },
                    createdAt: createdAt

                })
            }
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        (Post.create as jest.Mock).mockResolvedValue(
            {
                _id: "someId",
                title: "Trying out oil pastels",
                content: "This image was drawn today...",
                imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
                materials: ["oil pastels"],
                author: "author-id",
                createdAt: createdAt,
                populate: jest.fn().mockResolvedValue({
                    id: "someId",
                    title: "Trying out oil pastels",
                    content: "This image was drawn today...",
                    imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
                    materials: ["oil pastels"],
                    author: {
                        id: "author-id",
                        username: "author-username",
                    },
                    createdAt: createdAt,
                })
            }
        );
        await createPost(req, res);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: expect.objectContaining({
                id: "someId",
                title: "Trying out oil pastels",
                content: "This image was drawn today...",
                imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
                materials: ["oil pastels"],
                author: {
                    id: "author-id",
                    username: "author-username"
                },
                createdAt: createdAt
            })
        })
        expect(res.status).toHaveBeenCalledWith(201);
        expect(Post.create).toHaveBeenCalledTimes(1);
        expect(Post.create).toHaveBeenCalledWith(
            {
                title: "Trying out oil pastels",
                content: "This image was drawn today...",
                imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
                materials: ["oil pastels"],
                author: "authorId"
            }
        );

    });
    test("return error when no user is attached", async () => {

        const req = {
            body: {
                title: "Trying out oil pastels",
                content: "This image was drawn today...",
                imageUrl: "uploads/68600b2321b078541b943d5d//1751140112501-green-bologna.jpg",
                materials: ["oil pastels"],
            }
        } as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;
        await createPost(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: expect.any(String) });
    });
});
