import { Request, Response, NextFunction } from 'express';
import { User as UserType } from '../types';
import { User, UserDocument } from '../models';

export const login = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            data: { user: { name: '123', email: '123' }, token: '12345' }, success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error in getting home' });
    }
};

export const signUp = async (req: Request, res: Response) => {
    try {
        res.status(201).json({
            data: { user: { name: '123', email: '123' }, token: '12345' }, success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error in getting home' });
    }
};