import type { HandlerGetBooksCartType } from '../../types/cart/getBooksInCartTypes';

import db from '../../db/index';

export const getBooksInCart:HandlerGetBooksCartType = async (req, res, next) => {
  try {
    const userId = req.query.userId;

    const userCart = await db.cart.createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .leftJoinAndSelect('cart.book', 'book')
      .getMany();

    return res.json({ books: userCart });
  } catch (err) {
    next(err);
  }
};

export default getBooksInCart;
