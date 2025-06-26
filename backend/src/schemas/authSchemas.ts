import * as Joi from 'joi';

export const RegisterSchema: Joi.Schema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

export const LoginSchema: Joi.Schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});
