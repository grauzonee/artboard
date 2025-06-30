import Joi from 'joi';

export const CreateSchema: Joi.Schema = Joi.object().keys({
    title: Joi.string().required(),
    imageUrl: Joi.string().required(),
    materials: Joi.array().items(Joi.string()),
    content: Joi.string()
});
