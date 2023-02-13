import { StatusCodes } from 'http-status-codes';

import type { HandlerGetBookRateType } from 'src/types';

import db from '../../../db/index';

const getRatingBook: HandlerGetBookRateType = async (req, res, next) => {
  try {
    const { bookId, userId } = req.params;

    const bookRating = await db.bookRate
      .createQueryBuilder('rating')
      .where('rating.bookId = :bookId', { bookId })
      .andWhere('rating.userId = :userId', { userId })
      .getOne();

    if (!bookRating) {
      return res.status(StatusCodes.NO_CONTENT);
    }

    return res.json(bookRating);
  } catch (err) {
    next(err);
  }
};

export default getRatingBook;
