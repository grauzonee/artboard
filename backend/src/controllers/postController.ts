import { Post, IPost } from '../models/Post';
import { Request, Response } from 'express';

export async function getPosts(req: Request, res: Response) {

    const posts = await Post.find(req.dbFilter ?? {}).sort(req.dbSort ?? {}).populate('author', 'username');
    res.status(200).json({ success: true, data: posts });
}

export async function createPost(req: Request, res: Response) {
    const { title, content, imageUrl, materials = [] } = req.body;

    try {
        const author = req.user?._id;
        const post = await Post.create({ title, content, imageUrl, materials, author }).then(post => post.populate('author', 'username'));
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, message: error.message });
        }
        res.status(400).json({ success: false, message: error });
    }
}
