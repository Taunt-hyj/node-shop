import { Request, Response } from 'express';
import { Address, User } from '../models';
import { User as UserTypes } from '../types';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const index = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserTypes;
        const address = await Address.findOne({ user: user._id })
            .populate('items')
            .sort('-createdAt');

        res.status(200).json({ data: address });
    } catch (error) {
        res.status(500).json({ message: 'Error in getting address' });
    }
};

export const store = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserTypes;
        const { addressId, address, name, phone } = req.body;

        let data = await Address.findOne({ user: user._id });

        if (data) {
            // make sure user is the owner of the cart
            if (user._id.toString() !== data.user.toString()) {
                return res.status(405).json({
                    message: 'You cannot perform this operation',
                });
            }

            const isProductExist = data?.items.some((item) =>
                ObjectId(addressId).equals(item._id)
            );

            if (isProductExist) {
                data = await Address.findOneAndUpdate(
                    { _id: data._id, 'items._id': addressId },
                    { $inc: { 'items.$.address': address, 'items.$.name': name, 'items.$.phone': phone } },
                    { new: true }
                );
            } else {
                data = await Address.findOneAndUpdate(
                    { _id: data._id },
                    { $addToSet: { items: { address, name, phone } } },
                    { new: true }
                );
            }
        } else {
            data = await Address.create({
                user: user._id,
                items: [{ address, name, phone }],
            });
        }

        const addressItem = data?.items.find((item) =>
            ObjectId(addressId).equals(item._id)
        );

        res.status(200).json({ data: addressItem });
    } catch (error) {
        res.status(500).json({ message: 'Error in creating address' });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserTypes;

        const { addressId } = req.body;

        const data = await Address.findOneAndUpdate(
            { user: user._id },
            { $pull: { items: { _id: addressId } } },
            { new: true }
        ).populate('items._id');

        if (!data) {
            return res.status(404).json({ message: 'Address Item not found' });
        }

        res.status(200).json({ data: data?.items });
    } catch (error) {
        res.status(500).json({ message: 'Error in removing address' });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserTypes;

        const { addressId, address, name, phone } = req.body;

        let data = await Address.findOneAndUpdate(
            { user: user._id, 'items._id': addressId },
            { $set: { 'items.$.address': address, 'items.$.name': name, 'items.$.phone': phone } },
            { new: true }
        );
        if (!data) return res.status(404).json({ message: 'Address Item not found' });

        // make sure viewer is the owner of the cart
        if (user._id.toString() !== data.user.toString()) {
            return res.status(405).json({
                message: 'You cannot perform this operation',
            });
        }

        const addressItem = data?.items.find((item) =>
            ObjectId(addressId).equals(item._id)
        );

        return res.status(200).json({ data: addressItem });
    } catch (error) {
        res.status(500).json({ message: 'Error in getting product' });
    }
};
