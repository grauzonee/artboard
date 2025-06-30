"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = getPosts;
exports.createPost = createPost;
const Post_1 = require("../models/Post");
function getPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield Post_1.Post.find();
        res.status(200).json({ success: true, data: posts });
    });
}
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { title, content, imageUrl, materials = [] } = req.body;
        try {
            const author = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const post = yield Post_1.Post.create({ title, content, imageUrl, materials, author });
            res.status(201).json({ success: true, data: post });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ success: false, message: error.message });
            }
            res.status(400).json({ success: false, message: error });
        }
    });
}
