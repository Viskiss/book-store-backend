import express from 'express';
import { deleteUserSchema, passwordSchema, updateUserSchema } from '../utils/schemasYup/schemasUpdate';
import { createValidationMiddleware } from '../middlewares/createValidationMiddleware';
import auth from '../middlewares/auth';
import getUsers from '../controllers/getUsers';
import deleteUser from '../controllers/deleteUser';
import getCurrentUser from '../controllers/getCurrentUser';
import updateUser from '../controllers/updateUser';
import updatePassword from '../controllers/updatePassword';

const userRouter = express.Router();
userRouter.use(auth);

userRouter.get('/users', auth, getUsers);
userRouter.get('/me', auth, getCurrentUser);

userRouter.delete('/:userId', auth, createValidationMiddleware(deleteUserSchema), deleteUser);

userRouter.patch('/:userId', auth, createValidationMiddleware(updateUserSchema), updateUser);
userRouter.patch('/:userId/password', auth, createValidationMiddleware(passwordSchema), updatePassword);

export default userRouter;
