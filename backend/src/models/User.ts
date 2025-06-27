import mongoose from "mongoose";
import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

interface IUserMethods {
    matchPassword(enteredPassword: string): Promise<Boolean>;
    getJson(): Object;
}

export interface IUser extends Document, IUserMethods {
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
});

userSchema.pre('save', async function(next) {
    // when saving an existing user
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(this: IUser, enteredPassword: string): Promise<Boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.methods.getJson = function(this: IUser): Object {
    return { id: this._id, username: this.username, email: this.email };
}

export const User = model<IUser>('User', userSchema);
