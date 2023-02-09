import { StatusCodes } from 'http-status-codes';

import type { HandlerAddBookRateType } from 'src/types';
import CustomError from '../../../utils/customErrors/customErrors';

import BookRate from '../../../db/entities/bookStore/BookRate';
import errorsMessages from '../../../utils/customErrors/errors';

import db from '../../../db';

const changeBookRate = async (bookId: number) => {
  const bookRate = await db.bookRate
    .createQueryBuilder('rate')
    .where('rate.bookId = :bookId', { bookId })
    .getMany();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let mathRate = 0;

  bookRate.forEach((book) => {
    mathRate += Number(book.rate);
  });

  return Number((mathRate / bookRate.length).toFixed(1));
};

const addRateBook: HandlerAddBookRateType = async (req, res, next) => {
  try {
    const { bookId, userId, rate } = req.body;

    const book = await db.book.findOneBy({ id: bookId });

    if (!book) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.BOOK_NOT_FOUND,
      );
    }

    const rateSelectBook = await db.bookRate
      .createQueryBuilder('rate')
      .where('rate.userId = :userId AND rate.bookId = :bookId', {
        userId,
        bookId,
      })
      .getOne();

    if (rateSelectBook) {
      rateSelectBook.rate = rate;

      await db.bookRate.save(rateSelectBook);

      const result = await changeBookRate(bookId);

      book.rate = result;

      await db.book.save(book);
      return res.json(rateSelectBook);
    }
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

    const result = await changeBookRate(bookId);

    book.rate = result;

    await db.book.save(book);

    return res.json(ratingBook);
  } catch (err) {
    next(err);
  }
};

export default addRateBook;
