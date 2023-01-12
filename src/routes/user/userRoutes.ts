import express from 'express';
import avatarUser from '../../controllers/updateUser/avatarUser';
import { deleteUserSchema, passwordSchema, updateUserSchema } from '../../utils/schemasYup/schemasUpdate';
import { createValidationMiddleware } from '../../middlewares/createValidationMiddleware';
import auth from '../../middlewares/auth';
import getUsers from '../../controllers/updateUser/getUsers';
import deleteUser from '../../controllers/updateUser/deleteUser';
import updateUser from '../../controllers/updateUser/updateUser';
import updatePassword from '../../controllers/updateUser/updatePassword';

const userRouter = express.Router();

userRouter.use(auth);

userRouter.get('/users', getUsers);

userRouter.delete('/:userId', createValidationMiddleware(deleteUserSchema), deleteUser);

userRouter.post('/upload', avatarUser);

userRouter.patch('/:userId', createValidationMiddleware(updateUserSchema), updateUser);
userRouter.patch('/:userId/password', createValidationMiddleware(passwordSchema), updatePassword);

export default userRouter;
