import express from 'express';
import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import dotenv from 'dotenv';
import verifyToken from '../middlewares/verifyToken.js';
import * as authController from '../app/controllers/authController.js';
import checkRole from '../middlewares/checkRole.js';
import verifyReFreshToken from '../middlewares/verifyReFreshToken.js';
import passportGoogle from '../utils/passport.js';

const authRouter = express.Router();
passportGoogle();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email', 'phone'] }));
authRouter.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), authController.loginGoogle);

authRouter.post('/forgotPassword', authController.forgotPassword);
authRouter.post('/refreshToken', verifyReFreshToken, authController.refreshToken);
authRouter.post('/addSigninGoogle',authController.addSigninGoogle)
authRouter.use(verifyToken);
authRouter.post('/changePassword', authController.changePassword);
authRouter.use(checkRole);
authRouter.get('/users', authController.getAllUser);
authRouter.delete('/:email', authController.blockUser);

export default authRouter;