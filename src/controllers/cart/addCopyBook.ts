import type { HandlerAddCopyBookType } from 'src/types/cart/addCopyBookTypes ';
import CustomError from 'src/utils/customErrors/customErrors';
import { StatusCodes } from 'http-status-codes';

import errorsMessages from '../../utils/customErrors/errors';
import db from '../../db/index';

export const addCopyBook:HandlerAddCopyBookType = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;

    const addCopyBook = await db.cart.createQueryBuilder('cart')
      .where('cart.bookId = :bookId', { bookId })
      .getOne();

    if (!addCopyBook) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.ID_NOT_FOUND,
      );
    }

    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
