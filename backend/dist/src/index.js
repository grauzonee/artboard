"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    console.log("Server started...");
    res.writeHead(200, { 'content-type': "application/json" });
    return res.end(JSON.stringify({ message: "Hello world" }));
});
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
