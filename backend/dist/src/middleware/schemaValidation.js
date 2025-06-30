"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const schemaValidation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const message = error.details.map(i => i.message).join(',');
            res.status(400).json({ success: false, message: message });
            return;
        }
        next();
    };
};
exports.schemaValidation = schemaValidation;
