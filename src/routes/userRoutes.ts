import express from 'express';
import schemas from '../utils/schemasYup/schemas';
import auth from '../middlewares/auth';
import sing from '../controllers/singUser';
import getUser from '../controllers/getUser';
// import updateUser from '../controllers/updateUser';
// import deleteUser from '../controllers/deleteUser';
// import updatePassword from '../controllers/updatePassword';
import valid from '../middlewares/validator';

const userRouter = express.Router();

userRouter.get('/', auth, getUser);
userRouter.post('/sing-up', sing.singUp);
userRouter.post('/sing-in', sing.singIn);
// userRouter.get('/me', auth, );
// userRouter.patch('/:userId', auth, valid.validateUpdate(valid.userSchemaUpdate), updateUser);
// eslint-disable-next-line max-len
// userRouter.patch('/:userId/password', auth, valid.validatePass(valid.userSchemaPass), updatePassword);
// userRouter.delete('/:userId', auth, deleteUser);

export default userRouter;
