import { Schema, model, Document, Model } from "mongoose";
import { User } from './User';

export interface IPost extends Document<String> {
    title: string,
    content: string,
    imageUrl: string,
    author: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
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
        return ret;
    }
});
postSchema.statics.getSortableFields = () => {
    return ['createdAt'];
}

export const Post = model<IPost, IPostModel>('Post', postSchema);
