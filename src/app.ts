import express from 'express'
import {
    homeRoutes,
    authRoutes,
} from './routes' // 路由
import { PORT } from './config';

const app = express()

const start = async () => {
    app.use(express.json())

    app.use('/api/auth', authRoutes);
    app.use('/api/home', homeRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
};

start();