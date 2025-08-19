import { Schema, model, Document, Model, Types } from "mongoose";
import mongoose from "mongoose";

export interface ILike extends Document<string> {
    userId: Types.ObjectId,
    postId: Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ILikeModel extends Model<ILike> {
    getSortableFields: () => string[];
}

const likeSchema = new Schema<ILike>({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post',
        required: true
    }
}, { timestamps: true }
)
likeSchema.statics.getSortableFields = () => {
    return ['createdAt'];
}

export const Post = model<ILike, ILikeModel>('Like', likeSchema);
