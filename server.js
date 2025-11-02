import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import colors from 'colors';
import connectDB from './config/connectDb.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import userRouter from './routes/userRoutes.js';
import uploadRouter from './routes/uploadRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import serviceRouter from './routes/serviceRouter.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.use('/api/user', userRouter);
app.use('/api/file', uploadRouter);
app.use('/api/category', categoryRouter);
app.use('/api/service', serviceRouter)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`.green.bold.underline);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to DB:', error.message.red.bold);
        process.exit(1); // Stop the server
    });
