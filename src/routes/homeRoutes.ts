import { Router } from 'express';
import { index } from '../controllers/homeController';

const router = Router();

router.route('/').get(index);

export { router as homeRoutes };