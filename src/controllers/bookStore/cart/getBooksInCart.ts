import { StatusCodes } from 'http-status-codes';

import type { HandlerGetBooksCartType } from '../../../types';
import CustomError from '../../../utils/customErrors/customErrors';
import errorsMessages from '../../../utils/customErrors/errors';

import db from '../../../db/index';

export const getBooksInCart: HandlerGetBooksCartType = async (
  req,
  res,
  next,
) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.USER_NOT_FOUND,
      );
    }

    const userCart = await db.cart
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .leftJoinAndSelect('cart.book', 'book')
      .getMany();

    return res.json({ books: userCart });
  } catch (err) {
    next(err);
  }
};

export default getBooksInCart;
