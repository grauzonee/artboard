import Joi from 'joi';

export const passwordRule = Joi.string()
    .min(5)
    .max(30)
    .pattern(/^(?=.*[A-Z])(?=.*\d).+$/, 'at least 1 uppercase letter and 1 number')
    .required();
