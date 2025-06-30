"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const imageConfig_1 = require("../middleware/imageConfig");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.router = (0, express_1.Router)();
exports.router.post('/upload', [authMiddleware_1.authMiddleware, imageConfig_1.upload.single('image')], function (req, res) {
    var _a;
    const requestData = Object.assign(Object.assign({}, req.file), { imageUrl: (0, imageConfig_1.getImageUploadPath)(req) + '/' + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) });
    res.status(201).json({ success: true, data: requestData });
});
