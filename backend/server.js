import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';
import cors from 'cors';
import path from 'path';
import auth from './middlewares/auth.middleware.js';
const __dirname = path.resolve();


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const absolutePath = path.join(__dirname, "/frontend/dist"); //__dirname does not come as default if the mode is module type, it is available as default in commonjs type
app.use("/api/users", userRouter);
app.use("/api/products", auth, productRouter);
if(process.env.NODE_ENV === "production") {
    app.use(express.static(absolutePath));
    app.use((req, res) => {
        res.sendFile(path.resolve(absolutePath, "index.html"));
    })
}
const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => { // when the server starts this func runs.
    if(process.env.NODE_ENV === "production") {
        console.log(`Server started at https://products-store-rtc9.onrender.com`);
    } else {
        console.log(`Server started at http://localhost:${PORT}`);
    }
});




