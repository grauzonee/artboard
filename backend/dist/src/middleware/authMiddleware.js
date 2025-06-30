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
exports.authMiddleware = authMiddleware;
const utils_1 = require("../helper/auth/utils");
// Checks whether Bearer token is valid
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        try {
            const user = yield (0, utils_1.getUserByToken)(req);
            req.user = user;
            next();
        }
        catch (error) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
    });
}
