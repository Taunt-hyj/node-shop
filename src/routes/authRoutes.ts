import { Router } from 'express';
import { signUp, login } from '../controllers/authController';
import { protect } from '../middleware';
import {
    validate,
    loginValidation,
    signUpValidation,
} from '../validation';

const router = Router();

router.route('/signup').post(signUpValidation(), validate, signUp);
router.route('/login').post(loginValidation(), validate, login);
router.use(protect);

export { router as authRoutes };