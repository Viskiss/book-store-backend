import express from 'express';
import auth from '../middlewares/auth.middleware';
import sing from '../controllers/singUser';
import getUser from '../controllers/getUser';
import updateUser from '../controllers/updateUser';
import deleteUser from '../controllers/deleteUser';
import valid from '../middlewares/validator.middleware';
import updatePassword from '../controllers/updatePassword';

const userRouter = express.Router();

userRouter.get('/', auth, getUser);
userRouter.post('/singup', valid.validateSingUp(valid.userSchemaUp), sing.singUp);
userRouter.post('/singin', valid.validateSingIn(valid.userSchemaIn), sing.singIn);
userRouter.patch('/:id', auth, updateUser);
userRouter.patch('/pass/:id', auth, updatePassword);
userRouter.delete('/:id', auth, deleteUser);

export default userRouter;
