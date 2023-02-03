import { StatusCodes } from 'http-status-codes';

import type { HandlerGetBookRateType } from 'src/types';

import db from '../../../db/index';

const getRateBook: HandlerGetBookRateType = async (req, res, next) => {
  try {
    const { bookId, userId } = req.params;

    const rateBook = await db.bookRate
      .createQueryBuilder('rating')
      .where('rating.bookId = :bookId', { bookId })
      .andWhere('rating.userId = :userId', { userId })
      .getOne();

    if (!rateBook) {
      return res.status(StatusCodes.NO_CONTENT);
    }

    return res.json(rateBook);
  } catch (err) {
    next(err);
  }
};

export default getRateBook;
