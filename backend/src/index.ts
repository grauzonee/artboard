import express from 'express';
import 'dotenv/config';
import { router as authRouter } from './routes/auth';
import { router as postsRouter } from './routes/posts';
import { router as mediaRouter } from './routes/media';
import { checkAllRequiredVars, getConfigValue } from "./helper/configHelper";
import mongoose from "mongoose";
import path from 'path';
checkAllRequiredVars();
export const app: express.Application = express();

const port: number = parseInt(getConfigValue('PORT'));
const mongoString: string = getConfigValue('DB_CONN_STRING');

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/media', mediaRouter);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.get('/', (req, res) => {
    res.send(JSON.stringify({ message: "Hello world!" }));
});
mongoose.connect(mongoString).then(() => {
    console.log('Connected to MongoDb!');
    app.listen(port, () => {
        console.log("Server listening on port " + port);
    });
}).catch(err => {
    console.error("Failed to connect to Mongo", err);
    process.exit(1);
})


