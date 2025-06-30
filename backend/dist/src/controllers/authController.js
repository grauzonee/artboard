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
exports.getProfile = exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../models/User");
const utils_1 = require("../helper/auth/utils");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const userExistsEmail = yield User_1.User.findOne({ email });
    if (userExistsEmail) {
        return res.status(400).json({ success: false, message: "Email already in use" });
    }
    const userExistsUsername = yield User_1.User.findOne({ username });
    console.log(userExistsUsername);
    if (userExistsUsername) {
        return res.status(400).json({ success: false, message: "Username already in use" });
    }
    const user = yield User_1.User.create({ username, email, password });
    if (user) {
        console.log(user.toJSON());
        const token = (0, utils_1.generateToken)(user._id);
        const userJSON = user.toJSON();
        const responseData = Object.assign(Object.assign({}, userJSON), { token });
        return res.status(201).json({ success: true, data: responseData });
    }
    else {
        return res.status(400).json({ success: false, message: "Invalid user data" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (yield user.matchPassword(password)) {
        const token = (0, utils_1.generateToken)(user._id);
        const responseData = Object.assign(Object.assign({}, user.toJSON()), { token: token });
        return res.status(200).json({ success: true, data: responseData });
    }
    return res.status(400).json({ success: false, message: "Invalid password" });
});
exports.loginUser = loginUser;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, utils_1.getUserByToken)(req);
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        return res.status(401).json({ success: false, message: error });
    }
});
exports.getProfile = getProfile;
