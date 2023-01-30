import express from 'express';

import getSelectBook from '../../controllers/books/getSelectBook';
import filterBooks from '../../controllers/books/filterBooks';
import getBooks from '../../controllers/books/getBooks';
import getGenres from '../../controllers/books/getGenres';
import { getRecommendedBooks } from '../../controllers/books/getRecBooks';

const userRouter = express.Router();

userRouter.get('/filter', filterBooks);
userRouter.get('/books', getBooks);
userRouter.get('/gernes', getGenres);
userRouter.get('/:bookId', getSelectBook);
userRouter.get('/recommend/:userId', getRecommendedBooks);

export default userRouter;
