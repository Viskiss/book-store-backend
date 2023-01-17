import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerGetBooksType } from '../../types/books/getBooksTypes ';
import db from '../../db/index';

const getBooks: HandlerGetBooksType = async (req, res, next) => {
  try {
    const allBooks = await db.book.find();
    res.status(StatusCodes.OK).json({ books: allBooks });
  } catch (error) {
    next(error);
  }
};

export default getBooks;
