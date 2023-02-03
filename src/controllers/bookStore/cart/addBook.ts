import { StatusCodes } from 'http-status-codes';

import type { HandlerAddBookType } from 'src/types';

import CustomError from '../../../utils/customErrors/customErrors';
import Cart from '../../../db/entities/bookStore/Cart';
import errorsMessages from '../../../utils/customErrors/errors';

import db from '../../../db/index';

const addBook: HandlerAddBookType = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const book = await db.book.findOneBy({ id: bookId });
    const user = await db.user.findOneBy({ id: userId });

    if (!book) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.UNABLE_FOUND_BOOK,
      );
    }

    if (!user) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.USER_NOT_FOUND,
      );
    }

    const cart = new Cart();
    cart.book = book;
    cart.user = user;
    cart.author = book.author;
    cart.title = book.title;
    cart.cover = book.cover;
    cart.price = book.price;
    cart.quantityOfGoods = 1;

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

export default addBook;
