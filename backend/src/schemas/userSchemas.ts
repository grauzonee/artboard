import * as Joi from 'joi';
import { passwordRule } from './password';

export const UpdateProfileSchema: Joi.Schema = Joi.object({
    username: Joi.string(),
    name: Joi.string(),
    surname: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    birthdate: Joi.date(),
    avatar: Joi.string()
}).min(1);


export const UpdatePasswordSchema: Joi.Schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: passwordRule
});
