import express from 'express';

import getBooksInCart from '../../controllers/cart/getBooksInCart';
import addBook from '../../controllers/cart/addBook';
import deleteBookInCart from '../../controllers/cart/deleteBook';
import addCopyBook from '../../controllers/cart/addCopyBook';
import deleteCopyBook from '../../controllers/cart/deleteCopyBook';
import auth from '../../middlewares/auth';

const userRouter = express.Router();

userRouter.use(auth);

userRouter.post('/add', addBook);
userRouter.get('/:userId', getBooksInCart);
userRouter.delete('/delete/:cartId', deleteBookInCart);
userRouter.get('/copy/:bookId', addCopyBook);
userRouter.delete('/delete-copy/:bookId', deleteCopyBook);

export default userRouter;
