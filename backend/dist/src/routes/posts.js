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
exports.router = void 0;
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const schemaValidation_1 = require("../middleware/schemaValidation");
const postSchemas_1 = require("../schemas/postSchemas");
exports.router = (0, express_1.Router)();
exports.router.get('/all', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () { yield (0, postController_1.getPosts)(req, res); }));
exports.router.post('/create', [authMiddleware_1.authMiddleware, (0, schemaValidation_1.schemaValidation)(postSchemas_1.CreateSchema)], (req, res) => __awaiter(void 0, void 0, void 0, function* () { yield (0, postController_1.createPost)(req, res); }));
