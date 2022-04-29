import { UserDocument } from './User';
import { Schema, model, Document } from 'mongoose';

const { ObjectId, String } = Schema.Types;

interface Items {
    private _id(_id: any): unknown;
    address: String;
    name: String;
    phone: String;
}

export interface AddressDocument extends Document {
    user: UserDocument['_id'];
    items: Items[];
}

const AddressSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: 'User',
        },
        items: [
            {
                address: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                phone: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Address = model<AddressDocument>('Address', AddressSchema);
