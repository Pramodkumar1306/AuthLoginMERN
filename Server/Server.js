import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/MongoDB.js';
import authRouter from './routes/AuthRoute.js';
import userRoute from './routes/UserRoute.js'
import serverless from 'serverless-http'

const app = express();
connectDB();

const allowedOrigin = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.get('/', (req, res) => {
  res.send("API is working");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRoute);

export const handler = serverless(app);
