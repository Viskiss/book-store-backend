import express from 'express';
import { singInSchema, singUpSchema } from '../utils/schemasYup/schemasSign';
import { passwordSchema, updateUserSchema } from '../utils/schemasYup/schemasUpdate';
import { findDuble } from '../middlewares/findDuble';
import { createValidationMiddleware } from '../middlewares/validate';
import singUp from '../controllers/sing-UpUser';
import singIn from '../controllers/sing-InUser';
import auth from '../middlewares/auth';
import getUser from '../controllers/getUsers';
import deleteUser from '../controllers/deleteUser';
import getCurrentUser from '../controllers/getCurrentUser';
import updateUser from '../controllers/updateUser';
import updatePassword from '../controllers/updatePassword';

const userRouter = express.Router();

userRouter.post('/sing-up', findDuble, createValidationMiddleware(singUpSchema), singUp);
userRouter.post('/sing-in', createValidationMiddleware(singInSchema), singIn);

userRouter.get('/', auth, getUser);
userRouter.get('/me', auth, getCurrentUser);

userRouter.delete('/:userId', auth, deleteUser);

userRouter.patch('/:userId', auth, findDuble, createValidationMiddleware(updateUserSchema), updateUser);
userRouter.patch('/:userId/password', auth, createValidationMiddleware(passwordSchema), updatePassword);

export default userRouter;
