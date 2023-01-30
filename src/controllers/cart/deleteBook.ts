import { StatusCodes } from 'http-status-codes';

import type { HandlerDeleteBookType } from 'src/types/cart/deleteBookTypes ';
import CustomError from '../../utils/customErrors/customErrors';

import errorsMessages from '../../utils/customErrors/errors';
import db from '../../db/index';

const deleteBookInCart: HandlerDeleteBookType = async (req, res, next) => {
  try {
    const cartId = Number(req.params.cartId);

    if (!cartId) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.BOOK_NOT_FOUND,
      );
    }

    const selectBook = await db.cart
      .createQueryBuilder('cart')
      .where('cart.id = :cartId', { cartId })
      .getOne();

    await db.cart.remove(selectBook);

    const userCart = await db.cart
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId: req.user.id })
      .leftJoinAndSelect('cart.book', 'book')
      .getMany();

    res.status(StatusCodes.OK).json({ books: userCart });
  } catch (err) {
    next(err);
  }
};

export default deleteBookInCart;
