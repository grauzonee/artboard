import { Schema, model, Document, Model, Types } from "mongoose";
import mongoose from "mongoose";
import { getConfigValue } from "@helper/configHelper";

export interface IPost extends Document<string> {
    title: string,
    content: string,
    imageUrl: string,
    author: Types.ObjectId,
    materials: string[],
    createdAt?: Date,
    updatedAt?: Date
}

export interface IPostModel extends Model<IPost> {
    getSortableFields(): string[];
}

const postSchema = new Schema<IPost>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    materials: [{
        type: String
    }],
}, { timestamps: true });

postSchema.set('toJSON', {
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.imageUrl = `${getConfigValue('HOST')}/${ret.imageUrl}`;
        return ret;
    }
});
postSchema.statics.getSortableFields = () => {
    return ['createdAt'];
}

export const Post = model<IPost, IPostModel>('Post', postSchema);
