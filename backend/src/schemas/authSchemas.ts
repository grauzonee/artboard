import * as Joi from 'joi';
import { passwordRule } from '@schemas/password';

export const RegisterSchema: Joi.Schema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: passwordRule
});

export const LoginSchema: Joi.Schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});
