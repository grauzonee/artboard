import { Post } from '@models/Post';
import { Request, Response } from 'express';
import { deleteImage } from '@controllers/mediaController';
import { logger } from '@helper/loggerHelper';

export async function getPosts(req: Request, res: Response) {

    const posts = await Post.find(req.dbFilter ?? {}).sort(req.dbSort ?? {}).populate('author', 'username');
    res.status(200).json({ success: true, data: posts });
}

export async function getById(req: Request, res: Response) {

    const id = req.params.id;
    const post = await Post.findById({ _id: id, author: req.user?._id });
    if (!post) {
        return res.status(404).json({ success: false, message: "Post was not found" });
    }
    res.status(200).json({ success: true, data: post });
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

export async function deletePost(req: Request, res: Response) {
    const id = req.params.id;
    const deletedPost = await Post.findOneAndDelete({ _id: id, author: req.user?._id });
    if (!deletedPost) {
        return res.status(404).json({ success: false, message: "Post was not found" });
    }
    const message = "Post deleted successfully";
    try {
        await deleteImage(deletedPost.imageUrl);
    } catch (error) {
        logger.error(error instanceof Error ? error.message : error);
    }

    res.status(200).json({ success: true, message: message });
}

export async function updatePost(req: Request, res: Response) {
    const id = req.params.id;
    const { title, imageUrl, materials, content } = req.body;
    const post = await Post.findOne({ _id: id, author: req.user?._id });
    if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }
    const originalImageUrl = post.imageUrl;
    post.title = title ?? post.title;
    post.imageUrl = imageUrl ?? post.imageUrl;
    post.materials = materials ?? post.materials;
    post.content = content ?? post.content;
    await post.save().then(async (savedPost) => {
        if (savedPost === post) {
            if (originalImageUrl !== post.imageUrl) {
                try {
                    await deleteImage(originalImageUrl);
                } catch (error) {
                    logger.error(error instanceof Error ? error.message : error);
                }
            }
            return res.status(200).json({ success: true, data: savedPost });
        }
    });
}
