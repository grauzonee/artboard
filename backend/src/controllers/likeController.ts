import { Like } from "@models/Like"
import { Post } from "@models/Post"
import { Request, Response } from 'express';

export async function like(req: Request, res: Response) {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ success: false, message: "Post was not found" });
    }
    const userId = req.user?._id;
    const existingLike = await Like.findOne({ userId, postId });

    if (existingLike) {
        await existingLike.deleteOne();
        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
        return res.json({ success: true, liked: false });
    } else {
        await Like.create({ userId, postId });
        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
        return res.json({ success: true, liked: true });
    }
}

