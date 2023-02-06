import express from 'express';

import getSelectBook from '../../controllers/bookStore/books/getSelectBook';
import filterBooks from '../../controllers/bookStore/books/filterBooks';
import getBooks from '../../controllers/bookStore/books/getBooks';
import getGenres from '../../controllers/bookStore/books/getGenres';
import getRecommendedBooks from '../../controllers/bookStore/books/getRecBooks';

const bookRouter = express.Router();

bookRouter.get('/filter', filterBooks);
bookRouter.get('/all', getBooks);
bookRouter.get('/gernes', getGenres);
bookRouter.get('/:bookId', getSelectBook);
bookRouter.get('/recommend/:userId', getRecommendedBooks);

export default bookRouter;
