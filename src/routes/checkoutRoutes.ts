import { Router } from 'express';
import {
    createOrderPay,
    updataOrderGoods,
} from '../controllers/checkoutController';
import { protect } from '../middleware';

const router = Router();

router.route('/')
    .post(protect, createOrderPay)
    .put(protect, updataOrderGoods);

export { router as checkOutRoutes };