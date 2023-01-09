import express from 'express';
import avatarUser from '../controllers/afterAuth/avatarUser';
import { deleteUserSchema, passwordSchema, updateUserSchema } from '../utils/schemasYup/schemasUpdate';
import { createValidationMiddleware } from '../middlewares/createValidationMiddleware';
import auth from '../middlewares/auth';
import getUsers from '../controllers/afterAuth/getUsers';
import deleteUser from '../controllers/afterAuth/deleteUser';
import getCurrentUser from '../controllers/afterAuth/getCurrentUser';
import updateUser from '../controllers/afterAuth/updateUser';
import updatePassword from '../controllers/afterAuth/updatePassword';
import upload from '../middlewares/uploadAvatar';

const userRouter = express.Router();

userRouter.use(auth);

userRouter.get('/users', getUsers);
userRouter.get('/me', getCurrentUser);

userRouter.delete('/:userId', createValidationMiddleware(deleteUserSchema), deleteUser);

userRouter.post('/upload', upload.single('avatar'), avatarUser);

userRouter.patch('/:userId', createValidationMiddleware(updateUserSchema), updateUser);
userRouter.patch('/:userId/password', createValidationMiddleware(passwordSchema), updatePassword);

export default userRouter;
