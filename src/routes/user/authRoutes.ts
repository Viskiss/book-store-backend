import express from 'express';

import { singInSchema, singUpSchema } from '../../utils/schemasYup/schemasAuth';
import { createValidationMiddleware } from '../../middlewares/createValidationMiddleware';
import singUp from '../../controllers/auth/singUpUser';
import singIn from '../../controllers/auth/singInUser';
import auth from '../../middlewares/auth';
import getCurrentUser from '../../controllers/updateUser/getCurrentUser';

const userRouter = express.Router();

userRouter.get('/me', auth, getCurrentUser);

userRouter.post('/sign-up', createValidationMiddleware(singUpSchema), singUp);
userRouter.post('/sign-in', createValidationMiddleware(singInSchema), singIn);

export default userRouter;
