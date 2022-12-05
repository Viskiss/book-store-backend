import express from 'express';
import getUser from '../controllers/getUser';
import createUser from '../controllers/createUser';
import updateUser from '../controllers/updateUser';
import deleteUser from '../controllers/deleteUser';

const userRouter = express.Router();

userRouter.get('/', getUser);
userRouter.post('/', createUser);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
