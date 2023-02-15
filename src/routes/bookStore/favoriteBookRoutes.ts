import express from 'express';

import auth from '../../middlewares/auth';

import getLikedBooks from '../../controllers/bookStore/favoriteBooks/getFavoriteBooks';
import deleteLikedBook from '../../controllers/bookStore/favoriteBooks/deleteFavoriteBook';
import addLikedBook from '../../controllers/bookStore/favoriteBooks/addFavoriteBook';

const likedBookRouter = express.Router();

likedBookRouter.use(auth);

likedBookRouter.get('/books', getLikedBooks);

likedBookRouter.post('/add/:bookId', addLikedBook);

likedBookRouter.delete('/delete/:bookId', deleteLikedBook);

export default likedBookRouter;
