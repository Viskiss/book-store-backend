import express from 'express';

import getBooksInCart from '../../controllers/cart/getBooksInCart';
import addBook from '../../controllers/cart/addBook';
import deleteBookInCart from '../../controllers/cart/deleteBook';
import addCopyBook from '../../controllers/cart/addCopyBook';
import deleteCopyBook from '../../controllers/cart/deleteCopyBook';
import auth from '../../middlewares/auth';

const cartRouter = express.Router();

cartRouter.use(auth);

cartRouter.post('/add', addBook);
cartRouter.get('/:userId', getBooksInCart);
cartRouter.delete('/delete/:cartId', deleteBookInCart);
cartRouter.get('/copy/:bookId', addCopyBook);
cartRouter.delete('/delete-copy/:bookId', deleteCopyBook);

export default cartRouter;
