import { Request, Response } from 'express';
import { Cart, Order } from '../models';
import { User as UserType } from '../types';

const getCart = async (req: Request) => {
    const user = req.user as UserType;
    return await Cart.findOne({ user: user._id }).populate('items.product');
};

const calculateCartTotal = async (req: Request) => {
    const cart = await getCart(req);
    const total = cart?.items.reduce(
        (acc: any, el: any) => acc + el.product.price * el.quantity,
        0
    );
    return total;
};

const createOrder = async (
    userId: string,
    amount: number,
    state: string
) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items === []) return;

    const order = await Order.create({
        user: userId,
        total: amount,
        items: cart.items,
        state,
    });

    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { items: [] } });

    return order;
};

export const createOrderPay = async (req: Request, res: Response) => {
    const user = req.user as UserType;
    try {
        const totalAmount = await calculateCartTotal(req);
        const order = await createOrder(user._id, totalAmount, 'pay');
        res.status(200).json({ data: order });
    } catch (error) {
        res
            .status(500)
            .send({ message: 'Unexpected error occured. Please try again later.' });
    }
};

export const updataOrderGoods = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserType;
        const { orderId } = req.body;
        let order = await Order.findOneAndUpdate(
            { _id: orderId },
            { $set: { 'state': 'goods' } },
            { new: true }
        );
        res.status(200).json({ data: order });
    } catch (error) {
        res
            .status(500)
            .send({ message: 'Unexpected error occured. Please try again later.' });
    }
};

