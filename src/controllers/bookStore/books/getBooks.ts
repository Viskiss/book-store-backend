import {
  StatusCodes,
} from 'http-status-codes';

import type { HandlerGetBooksType } from '../../../types';

import db from '../../../db';

const getBooks: HandlerGetBooksType = async (req, res, next) => {
  try {
    const allBooks = await db.book.find();
    res.status(StatusCodes.OK).json({ books: allBooks });
  } catch (error) {
    next(error);
  }
};

export default getBooks;
