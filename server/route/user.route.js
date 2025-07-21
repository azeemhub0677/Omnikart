import {Router} from 'express';
import { loginController, registerUserConroller, verfiyEmailController } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register',registerUserConroller);

userRouter.post('verify-email',verfiyEmailController);

userRouter.post('/login',loginController);

export default userRouter;