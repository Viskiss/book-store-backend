import express from 'express';
import registrationUser from 'src/controllers/registration';
import loginUser from 'src/controllers/loginUser';
import getUser from '../controllers/getUser';
import updateUser from '../controllers/updateUser';
import deleteUser from '../controllers/deleteUser';

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);

userRouter.post('/login', loginUser);

userRouter.get('/', getUser);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
