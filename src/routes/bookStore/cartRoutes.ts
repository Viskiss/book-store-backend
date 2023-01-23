import express from 'express';
import getBooksInCart from '../../controllers/cart/getBooksInCart';
import { addBook } from '../../controllers/cart/addBook';

const userRouter = express.Router();

userRouter.post('/add', addBook);
userRouter.get('/:userId', getBooksInCart);

export default userRouter;
