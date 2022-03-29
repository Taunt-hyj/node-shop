import { Router } from 'express';
import { signUp, login } from '../controllers/authController';
import {
    validate,
    loginValidation,
    signUpValidation,
} from '../validation';

const router = Router();

router.route('/signup').post(signUpValidation(), validate, signUp);
router.route('/login').post(loginValidation(), validate, login);

export { router as authRoutes };