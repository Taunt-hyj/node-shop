import { Router } from 'express';
import {
    login,
    signUp,
    getMe,
    changePassword,
    changeRole,
} from '../controllers/authController';
import { protect } from '../middleware';
import {
    validate,
    loginValidation,
    signUpValidation,
    changePasswordValidation,
} from '../validation';

const router = Router();

router.route('/signup').post(signUpValidation(), validate, signUp);
router.route('/login').post(loginValidation(), validate, login);
router.use(protect);

router.route('/me').get(getMe);

router
    .route('/change-password')
    .patch(changePasswordValidation(), validate, changePassword);

router
    .route('/change-role')
    .patch(changeRole);
export { router as authRoutes };