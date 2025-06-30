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
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const schemaValidation_1 = require("../middleware/schemaValidation");
const authSchemas_1 = require("../schemas/authSchemas");
exports.router = (0, express_1.Router)();
exports.router.post('/register', (0, schemaValidation_1.schemaValidation)(authSchemas_1.RegisterSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () { yield (0, authController_1.registerUser)(req, res); }));
exports.router.post('/login', (0, schemaValidation_1.schemaValidation)(authSchemas_1.LoginSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () { yield (0, authController_1.loginUser)(req, res); }));
exports.router.get('/profile', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () { (0, authController_1.getProfile)(req, res); }));
