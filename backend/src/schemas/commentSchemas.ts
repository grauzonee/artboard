import Joi from "joi";

export const CreateSchema: Joi.Schema = Joi.object().keys({
    content: Joi.string().required(),
    post: Joi.string().required(),
});
export const UpdateSchema: Joi.Schema = Joi.object().keys({
    content: Joi.string().required(),
});
