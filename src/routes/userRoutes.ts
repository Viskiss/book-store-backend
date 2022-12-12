import express from 'express';
import { findDuble } from '../middlewares/findDuble';
import { compare } from '../middlewares/revise';
import singUp from '../controllers/sing-UpUser';
import singIn from '../controllers/sing-InUser';
import schemas from '../utils/schemasYup/schemas';
import auth from '../middlewares/auth';
import getUser from '../controllers/getUsers';
import deleteUser from '../controllers/deleteUser';
import getCurrentUser from '../controllers/getCurrentUser';
import updateUser from '../controllers/updateUser';
import updatePassword from '../controllers/updatePassword';

const userRouter = express.Router();

userRouter.post('/sing-up', findDuble, compare(schemas.userSchemaUp), singUp);
userRouter.post('/sing-in', compare(schemas.userSchemaIn), singIn);

userRouter.get('/', auth, getUser);
userRouter.get('/me', auth, getCurrentUser);

userRouter.delete('/:userId', auth, deleteUser);

userRouter.patch('/:userId', auth, findDuble, compare(schemas.userSchemaUpdate), updateUser);
userRouter.patch('/:userId/password', auth, compare(schemas.userSchemaPass), updatePassword);

export default userRouter;
