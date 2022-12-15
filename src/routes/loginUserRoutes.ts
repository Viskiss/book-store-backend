import express from 'express';
import { singInSchema, singUpSchema } from '../utils/schemasYup/schemasLogin';
import { createValidationMiddleware } from '../middlewares/createValidationMiddleware';
import singUp from '../controllers/sing-UpUser';
import singIn from '../controllers/sing-InUser';

const userRouter = express.Router();

userRouter.post('/sing-up', createValidationMiddleware(singUpSchema), singUp);
userRouter.post('/sing-in', createValidationMiddleware(singInSchema), singIn);

export default userRouter;
