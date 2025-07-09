import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

interface IUserMethods {
    matchPassword(enteredPassword: string): Promise<boolean>;
    getJson(): object;
}

export interface IUser extends Document<string>, IUserMethods {
    email: string,
    username: string,
    password: string,
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    // when saving an existing user
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
    }
});

userSchema.methods.matchPassword = async function(this: IUser, enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
}

export const User = model<IUser>('User', userSchema);
