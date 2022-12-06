import express from 'express';
import sing from '../controllers/singUser';
import getUser from '../controllers/getUser';
import updateUser from '../controllers/updateUser';
import deleteUser from '../controllers/deleteUser';

const userRouter = express.Router();

userRouter.get('/', getUser);
userRouter.post('/singup', sing.singUp);
userRouter.post('/singin', sing.singIn);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
