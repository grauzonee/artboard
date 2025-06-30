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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByToken = exports.verifyToken = exports.generateToken = void 0;
const configHelper_1 = require("../configHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../models/User");
const generateToken = (id) => {
    const jwtSecret = (0, configHelper_1.getConfigValue)('JWT_SECRET');
    return jsonwebtoken_1.default.sign({ id }, jwtSecret, { 'expiresIn': '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, (0, configHelper_1.getConfigValue)('JWT_SECRET'));
    }
    catch (err) {
        throw Error("Not authorized");
    }
};
exports.verifyToken = verifyToken;
const getUserByToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '')) !== null && _b !== void 0 ? _b : '';
    const decoded = (0, exports.verifyToken)(token);
    const user = yield User_1.User.findById(decoded.id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
exports.getUserByToken = getUserByToken;
