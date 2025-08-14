import { Schema, Types, Document, Model, model } from 'mongoose';
import mongoose from 'mongoose';
import { Paginable } from "types/pagination";
import { mongoosePagination } from "../plugins/paginate";

export interface IComment extends Document<string> {
    content: string,
    author: Types.ObjectId,
    post: Types.ObjectId
}

export interface ICommentModel extends Model<IComment>, Paginable<IComment> {
    getSortableFields(): string[];
}

const commentSchema = new Schema<IComment>({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post',
        required: true
    },
}, { timestamps: true });

commentSchema.plugin(mongoosePagination);
commentSchema.set('toJSON', {
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

commentSchema.statics.getSortableFields = () => {
    return ['createdAt'];
}

export const Comment = model<IComment, ICommentModel>('Comment', commentSchema);
