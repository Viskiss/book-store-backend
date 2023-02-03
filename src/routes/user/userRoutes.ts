import express from 'express';

import auth from '../../middlewares/auth';

import { deleteUserSchema, passwordSchema, updateUserSchema } from '../../utils/schemasYup/schemasUpdate';
import { createValidationMiddleware } from '../../middlewares/createValidationMiddleware';

import avatarUser from '../../controllers/user/updateUser/avatarUser';
import getUsers from '../../controllers/user/updateUser/getUsers';
import deleteUser from '../../controllers/user/updateUser/deleteUser';
import updateUser from '../../controllers/user/updateUser/updateUser';
import updatePassword from '../../controllers/user/updateUser/updatePassword';

const userRouter = express.Router();

userRouter.use(auth);

userRouter.get('/users', getUsers);

userRouter.delete('/:userId', createValidationMiddleware(deleteUserSchema), deleteUser);

userRouter.post('/upload', avatarUser);

userRouter.patch('/:userId', createValidationMiddleware(updateUserSchema), updateUser);
userRouter.patch('/:userId/password', createValidationMiddleware(passwordSchema), updatePassword);

export default userRouter;
