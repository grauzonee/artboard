"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const auth_1 = require("./routes/auth");
const posts_1 = require("./routes/posts");
const media_1 = require("./routes/media");
const configHelper_1 = require("./helper/configHelper");
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
const port = parseInt((0, configHelper_1.getConfigValue)('PORT'));
const mongoString = (0, configHelper_1.getConfigValue)('DB_CONN_STRING');
exports.app.use(express_1.default.json());
exports.app.use('/api/auth', auth_1.router);
exports.app.use('/api/posts', posts_1.router);
exports.app.use('/api/media', media_1.router);
exports.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
exports.app.get('/', (req, res) => {
    res.send(JSON.stringify({ message: "Hello world!" }));
});
mongoose_1.default.connect(mongoString).then(() => {
    console.log('Connected to MongoDb!');
    exports.app.listen(port, () => {
        console.log("Server listening on port " + port);
    });
}).catch(err => {
    console.error("Failed to connect to Mongo", err);
    process.exit(1);
});
