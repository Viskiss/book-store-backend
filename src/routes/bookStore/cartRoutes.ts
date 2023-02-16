import express from 'express';

import auth from '../../middlewares/auth';

import changeCopyBook from '../../controllers/bookStore/cart/changeCopyBook';
import getBooksInCart from '../../controllers/bookStore/cart/getBooksInCart';
import addBook from '../../controllers/bookStore/cart/addBook';
import deleteBookInCart from '../../controllers/bookStore/cart/deleteBook';

const cartRouter = express.Router();

cartRouter.use(auth);

cartRouter.get('/:userId', getBooksInCart);

cartRouter.post('/add', addBook);

cartRouter.delete('/delete/:cartId', deleteBookInCart);

cartRouter.patch('/change-copy/:bookId/:mark', changeCopyBook);

export default cartRouter;
