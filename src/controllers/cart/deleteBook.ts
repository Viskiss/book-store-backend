import { StatusCodes } from 'http-status-codes';
import type { HandlerDeleteBookType } from 'src/types/cart/deleteBookTypes ';
import db from '../../db/index';

export const removeBookFromCart: HandlerDeleteBookType = async (req, res, next) => {
  try {
    const cartId = Number(req.query.cartId);

    const selectBook = await db.cart
      .createQueryBuilder('cart')
      .where('cart.id = :cartId', { cartId })
      .getOne();

    await db.cart.remove(selectBook);

    res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};
