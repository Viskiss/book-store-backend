import express from 'express';
import getBooksInCart from '../../controllers/cart/getBooksInCart';
import addBook from '../../controllers/cart/addBook';
import deleteBookInCart from '../../controllers/cart/deleteBook';
import addCopyBook from '../../controllers/cart/addCopyBook';

const userRouter = express.Router();

userRouter.post('/add', addBook);
userRouter.get('/:userId', getBooksInCart);
userRouter.delete('/delete/:cartId', deleteBookInCart);
userRouter.get('/copy/:bookId', addCopyBook);

export default userRouter;
