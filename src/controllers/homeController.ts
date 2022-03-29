import { Request, Response } from 'express';


const ans = [
    {
        "name": "繁华若梦",
        "rate": "4.8",
        "image": "assets/tea1.jpg",
        "count": "45",
        "price": "13",
        "profile": "A delicious and refreshing frozen mango ice ceram,in hot weather to create the perfect pulp drink! This cream slushine is made from fresh fruit,ice cubes andcream. It will provide you with refreshing throughout the summer~~",
    },
    {
        "name": "眉目传情",
        "rate": "4.5",
        "image": "assets/tea2.jpg",
        "count": "22",
        "price": "17",
        "profile": "A delicious and refreshing frozen mango ice ceram,in hot weather to create the perfect pulp drink! This cream slushine is made from fresh fruit,ice cubes andcream. It will provide you with refreshing throughout the summer~~",
    },
    {
        "name": "浮光撩影",
        "rate": "4.3",
        "image": "assets/tea3.jpg",
        "count": "65",
        "price": "22",
        "profile": "A delicious and refreshing frozen mango ice ceram,in hot weather to create the perfect pulp drink! This cream slushine is made from fresh fruit,ice cubes andcream. It will provide you with refreshing throughout the summer~~",
    },
];

export const index = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            data: ans
        });
    } catch (error) {
        res.status(500).json({ message: 'Error in getting home' });
    }
};