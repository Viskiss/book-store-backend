import { StatusCodes } from 'http-status-codes';

import type { HandlerAddCopyBookType } from 'src/types/cart/addCopyBookTypes ';

import db from '../../db/index';

const addCopyBook:HandlerAddCopyBookType = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;

    await db.cart.createQueryBuilder('cart')
      .where('cart.bookId = :bookId', { bookId })
      .getOne();

    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default addCopyBook;
