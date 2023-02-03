import express from 'express';

import auth from '../../middlewares/auth';

import getBooksInCart from '../../controllers/bookStore/cart/getBooksInCart';
import addBook from '../../controllers/bookStore/cart/addBook';
import deleteBookInCart from '../../controllers/bookStore/cart/deleteBook';
import addCopyBook from '../../controllers/bookStore/cart/addCopyBook';
import deleteCopyBook from '../../controllers/bookStore/cart/deleteCopyBook';

const cartRouter = express.Router();

cartRouter.use(auth);

cartRouter.post('/add', addBook);
cartRouter.get('/:userId', getBooksInCart);
cartRouter.delete('/delete/:cartId', deleteBookInCart);
cartRouter.get('/copy/:bookId', addCopyBook);
cartRouter.delete('/delete-copy/:bookId', deleteCopyBook);

export default cartRouter;
