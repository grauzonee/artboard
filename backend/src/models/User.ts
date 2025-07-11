import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';
import { getConfigValue } from "@helper/configHelper";
import { checkImage } from "@controllers/mediaController";

interface IUserMethods {
    matchPassword(enteredPassword: string): Promise<boolean>;
    getJson(): object;
    updateProfile(data: UpdateUserData): Promise<IUser>,
    updatePassword(data: UpdatePasswordData): Promise<void>
}

export interface IUser extends Document<string>, IUserMethods {
    email: string,
    username: string,
    password: string,
    name: string | null,
    surname: string | null,
    country: string | null,
    city: string | null,
    birthdate: Date | null,
    avatar: string | null
}

export type UpdateUserData = Partial<Pick<IUser, 'username' | 'name' | 'surname' | 'country' | 'city' | 'birthdate' | 'avatar'>>
export interface UpdatePasswordData {
    oldPassword: string,
    newPassword: string
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
        required: true,
        default: null
    },
    name: {
        type: String,
        required: false,
        default: null
    },
    surname: {
        type: String,
        required: false,
        default: null
    },
    country: {
        type: String,
        required: false,
        default: null
    },
    city: {
        type: String,
        required: false,
        default: null
    },
    birthdate: {
        type: Date,
        required: false,
        default: null
    },
    avatar: {
        type: String,
        required: false,
        default: null
    },
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
        ret.avatar = `${getConfigValue('HOST')}/${ret.avatar}`;
        return ret;
    }
});

userSchema.methods.matchPassword = async function(this: IUser, enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.updateProfile = async function(this: IUser, data: UpdateUserData): Promise<IUser> {
    if (typeof (data.avatar) === 'string') {
        if (!checkImage(data.avatar)) {
            throw new Error("Invalid avatar, image doesn't exist")
        }
        this.avatar = data.avatar
    }
    if (data.country !== undefined) this.country = data.country;
    if (data.city !== undefined) this.city = data.city;
    if (data.name !== undefined) this.name = data.name;
    if (data.surname !== undefined) this.surname = data.surname;
    if (data.surname !== undefined) this.surname = data.surname;
    if (data.birthdate !== undefined) this.birthdate = data.birthdate;

    await this.save();
    return this;
}

userSchema.methods.updatePassword = async function(this: IUser, data: UpdatePasswordData): Promise<void> {
    if (data.newPassword === data.oldPassword) {
        throw new Error("Passwords are equal!");
    }
    const isPassCorrect = await this.matchPassword(data.oldPassword);
    if (!isPassCorrect) {
        throw new Error("Old password is not correct!");
    }
    this.password = data.newPassword;


    await this.save();
}

export const User = model<IUser>('User', userSchema);
