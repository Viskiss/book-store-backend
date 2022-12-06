import express from 'express';
import { auth } from '../middlewares/auth.middleware';
import sing from '../controllers/singUser';
import getUser from '../controllers/getUser';
import updateUser from '../controllers/updateUser';
import deleteUser from '../controllers/deleteUser';

const userRouter = express.Router();

userRouter.get('/', auth, getUser);
userRouter.post('/singup', sing.singUp);
userRouter.post('/singin', sing.singIn);
userRouter.patch('/:id', auth, updateUser);
userRouter.delete('/:id', auth, deleteUser);

export default userRouter;
