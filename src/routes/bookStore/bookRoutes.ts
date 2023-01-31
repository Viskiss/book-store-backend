import express from 'express';

import getSelectBook from '../../controllers/books/getSelectBook';
import filterBooks from '../../controllers/books/filterBooks';
import getBooks from '../../controllers/books/getBooks';
import getGenres from '../../controllers/books/getGenres';
import { getRecommendedBooks } from '../../controllers/books/getRecBooks';

const bookRouter = express.Router();

bookRouter.get('/filter', filterBooks);
bookRouter.get('/books', getBooks);
bookRouter.get('/gernes', getGenres);
bookRouter.get('/:bookId', getSelectBook);
bookRouter.get('/recommend/:userId', getRecommendedBooks);

export default bookRouter;
