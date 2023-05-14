import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import route from './routes/index.js';
import dbConnect from './config/db/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;
export const SECET_KEY = process.env.SECET_KEY;

export const DOMAIN = process.env.DOMAIN;
const app = express();

// app.use(cors({
//     credentials:true,
//     origin:['http://localhost:3000','https://ghienphim.onrender.com']
// }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dbConnect();

route(app);

app.listen(PORT, () => {
    console.log("app listen on PORT: " + PORT);
})


