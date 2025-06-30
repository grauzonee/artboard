"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreateSchema = joi_1.default.object().keys({
    title: joi_1.default.string().required(),
    imageUrl: joi_1.default.string().required(),
    materials: joi_1.default.array().items(joi_1.default.string()),
    content: joi_1.default.string()
});
