import express from 'express';

import auth from '../../middlewares/auth';

import getLikedBooks from '../../controllers/likedBooks/getLikedBooks';
import deleteLikedBook from '../../controllers/likedBooks/deleteLikedBook';
import addLikedBook from '../../controllers/likedBooks/addLikedBook';

const likedBookRouter = express.Router();

likedBookRouter.use(auth);

likedBookRouter.get('/books', getLikedBooks);

likedBookRouter.post('/add/:bookId', addLikedBook);

likedBookRouter.delete('/delete/:bookId', deleteLikedBook);

export default likedBookRouter;
