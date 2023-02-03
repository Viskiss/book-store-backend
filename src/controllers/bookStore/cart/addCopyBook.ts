import { StatusCodes } from 'http-status-codes';

import type { HandlerAddCopyBookType } from 'src/types';
import CustomError from '../../../utils/customErrors/customErrors';
import errorsMessages from '../../../utils/customErrors/errors';

import db from '../../../db/index';

const addCopyBook: HandlerAddCopyBookType = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user.id;

    if (!bookId) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.BOOK_NOT_FOUND,
      );
    }

    const cart = await db.cart
      .createQueryBuilder('cart')
      .where('cart.bookId = :bookId', { bookId })
      .getOne();

    const num = cart.quantityOfGoods;
    cart.quantityOfGoods = +num + 1;

    await db.cart.save(cart);

    const userCart = await db.cart
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .leftJoinAndSelect('cart.book', 'book')
      .getMany();

    return res.status(StatusCodes.OK).json({ books: userCart });
  } catch (err) {
    next(err);
  }
};

export default addCopyBook;
