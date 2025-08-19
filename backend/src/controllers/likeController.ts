import { Like } from "@models/Like"
import { Post } from "@models/Post"
import { Request, Response } from 'express';
import { PaginationOptions } from 'types/pagination';

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
        await Post.findByIdAndUpdate(postId, { $pull: { likedBy: userId } });
        return res.json({ success: true, liked: false });
    } else {
        await Like.create({ userId, postId });
        await Post.findByIdAndUpdate(postId, { $addToSet: { likedBy: userId } });
        return res.json({ success: true, liked: true });
    }
}

export async function getLikedPosts(req: Request, res: Response) {

    const { page = 1, limit = 1 } = req.query || {};
    const likedPosts = await Like.find({ userId: req.user?.id })
        .select('postId -_id')
        .lean();

    const postIds = likedPosts.map(like => like.postId);
    const filter = { _id: { $in: postIds } };
    const options: PaginationOptions = {
        page: Number(page),
        limit: Number(limit),
        sort: req.dbSort ?? {},
        populate: "author"
    }
    const posts = await Post.paginate(filter, options)
    res.status(200).json({ success: true, data: posts });
}

