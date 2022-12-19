import express from 'express';
import { singInSchema, singUpSchema } from '../utils/schemasYup/schemasAuth';
import { createValidationMiddleware } from '../middlewares/createValidationMiddleware';
import singUp from '../controllers/beforeAuth/singUpUser';
import singIn from '../controllers/beforeAuth/singInUser';

const userRouter = express.Router();

userRouter.post('/sing-up', createValidationMiddleware(singUpSchema), singUp);
userRouter.post('/sing-in', createValidationMiddleware(singInSchema), singIn);

export default userRouter;
