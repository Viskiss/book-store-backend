import { StatusCodes } from 'http-status-codes';

import type { HandlerAddBookType } from 'src/types/cart/addBookTypes';

import CustomError from '../../utils/customErrors/customErrors';
import Cart from '../../db/entities/bookStore/Cart';

import errorsMessages from '../../utils/customErrors/errors';
import db from '../../db/index';

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

    const cart = new Cart();
    cart.book = book;
    cart.user = user;
    cart.author = book.author;
    cart.title = book.title;
    cart.cover = book.cover;
    cart.price = book.price;

    await db.cart.save(cart);

    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default addBook;
