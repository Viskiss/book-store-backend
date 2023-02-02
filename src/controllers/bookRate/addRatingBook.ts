import { StatusCodes } from 'http-status-codes';

import type { HandlerAddBookRateType } from 'src/types/bookRate';
import BookRate from '../../db/entities/bookStore/BookRate';

import db from '../../db/index';

const addRateBook: HandlerAddBookRateType = async (req, res, next) => {
  try {
    const { bookId, userId, rate } = req.body;

    const ratingBook = new BookRate();

    ratingBook.bookId = bookId;
    ratingBook.userId = userId;
    ratingBook.rate = rate;

    await db.bookRate.save(ratingBook);

    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default addRateBook;
