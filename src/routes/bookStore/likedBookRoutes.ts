import express from 'express';

import auth from '../../middlewares/auth';

import getLikedBooks from '../../controllers/bookStore/likedBooks/getLikedBooks';
import deleteLikedBook from '../../controllers/bookStore/likedBooks/deleteLikedBook';
import addLikedBook from '../../controllers/bookStore/likedBooks/addLikedBook';

const likedBookRouter = express.Router();

likedBookRouter.use(auth);

likedBookRouter.get('/books', getLikedBooks);

likedBookRouter.post('/add/:bookId', addLikedBook);

likedBookRouter.delete('/delete/:bookId', deleteLikedBook);

export default likedBookRouter;
