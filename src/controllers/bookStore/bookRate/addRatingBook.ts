import { StatusCodes } from 'http-status-codes';

import type { HandlerAddBookRateType } from 'src/types';
import CustomError from '../../../utils/customErrors/customErrors';

import BookRate from '../../../db/entities/bookStore/BookRate';
import errorsMessages from '../../../utils/customErrors/errors';

import db from '../../../db';

const addRateBook: HandlerAddBookRateType = async (req, res, next) => {
  try {
    const { bookId, userId, rate } = req.body;

    const ratingBook = new BookRate();

    ratingBook.bookId = bookId;
    ratingBook.userId = userId;
    ratingBook.rate = rate;

    if (!ratingBook) {
      throw new CustomError(
        StatusCodes.NOT_IMPLEMENTED,
        errorsMessages.INVALID_CREDENTIALS,
      );
    }

    await db.bookRate.save(ratingBook);

    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default addRateBook;
