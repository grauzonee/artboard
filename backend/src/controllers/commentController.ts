import { Comment } from '../models/Comment';
import { Request, Response } from 'express';

export const getComments = async (req: Request, res: Response) => {
    const comments = await Comment.find(req.dbFilter ?? {}).sort(req.dbSort ?? {}).populate('author', 'username');
    return res.status(200).json({ success: true, data: comments });
}
export const getCommentById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const comment = await Comment.findById(id).populate('author', 'username');
    if (!comment) {
        return res.status(404).json({ success: false, message: "Comment not found" });
    }
    return res.status(200).json({ success: true, data: comment });
}
export const createComment = async (req: Request, res: Response) => {
    const { content, post } = req.body;

    const author = req.user?._id;
    try {
        const comment = await Comment.create({ content, post, author });
        return res.status(201).json({ success: true, data: comment });
    } catch (error) {
        res.status(400).json({ success: false, message: (error instanceof Error ? error.message : error) });
    }
}
export const updateComment = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { content } = req.body;
    const author = req.user?._id;
    const comment = await Comment.findOne({ _id: id, author: author });
    if (!comment) {
        return res.status(404).json({ success: false, message: "Comment not found" });
    }
    comment.content = content;
    await comment.save().then((savedComment) => {
        if (savedComment === comment) {
            return res.status(200).json({ success: true, data: savedComment });
        }
        return res.status(500).json({ success: false, mesage: "Could not save the comment" });
    })
}

export const deleteComment = async (req: Request, res: Response) => {
    const id = req.params.id;
    const author = req.user?._id;
    const deletedComment = await Comment.findOneAndDelete({ _id: id, author: author });
    if (deletedComment) {
        return res.status(200).json({ success: true, message: "Comment has been deleted successfully" });
    }
    return res.status(500).json({ success: false, message: "Comment could not be deleted" });
}
