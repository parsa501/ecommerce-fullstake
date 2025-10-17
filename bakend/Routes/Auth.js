import express from 'express'
import { auth, forgetPassword, loginWithEmail, loginWithOtp, loginWithPassword, resendCode } from '../Controllers/AuthCn.js';
const authRouter = express.Router();
authRouter.route('/').post(auth)
authRouter.route('/login-password').post(loginWithPassword)
authRouter.route('/login-otp').post(loginWithOtp)
authRouter.route('/login-email').post(loginWithEmail)
authRouter.route('/resend-code').post(resendCode)
authRouter.route('/forget-password').post(forgetPassword)

export default authRouter;