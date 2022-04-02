import express from 'express'
import {
    homeRoutes,
    authRoutes,
    userRoutes,
    cartRoutes,
} from './routes' // 路由
import passport from 'passport';
import { PORT } from './config';
import { connectDb } from './database';
require('./lib/passport');


const app = express()

const start = async () => {
    await connectDb();

    app.use(express.json({ limit: '50mb' }))
    app.use(passport.initialize());

    app.use('/api/auth', authRoutes);
    app.use('/api/home', homeRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/cart', cartRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
};

start();