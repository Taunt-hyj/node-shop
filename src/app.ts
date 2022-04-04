import express from 'express'
import {
    authRoutes,
    userRoutes,
    cartRoutes,
    productRoutes,
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
    app.use('/api/users', userRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/products', productRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
};

start();