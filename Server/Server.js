import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/MongoDB.js';
import authRouter from './routes/AuthRoute.js';
import userRoute from './routes/UserRoute.js'

const app = express();
const PORT = process.env.PORT || 4000; 
connectDB();
const allowedOrigin = ['http://localhost:5173']
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigin , credentials: true}));


//API End Points
app.get('/',(req,res) => {
    res.send("Api Is Working")
})
app.use('/api/auth',authRouter);
app.use('/api/user',userRoute);



app.listen(PORT,()=> {
    
})