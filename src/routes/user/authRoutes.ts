import express from 'express';

import auth from '../../middlewares/auth';

import { singInSchema, singUpSchema } from '../../utils/schemasYup/schemasAuth';
import { createValidationMiddleware } from '../../middlewares/createValidationMiddleware';

import singUp from '../../controllers/user/auth/singUpUser';
import singIn from '../../controllers/user/auth/singInUser';
import getCurrentUser from '../../controllers/user/updateUser/getCurrentUser';

const userRouter = express.Router();

userRouter.get('/me', auth, getCurrentUser);

userRouter.post('/sign-up', createValidationMiddleware(singUpSchema), singUp);
userRouter.post('/sign-in', createValidationMiddleware(singInSchema), singIn);

export default userRouter;
