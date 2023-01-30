import { StatusCodes } from 'http-status-codes';

import type { HandlerAddCopyBookType } from 'src/types/cart/addCopyBookTypes ';
import CustomError from '../../utils/customErrors/customErrors';

import db from '../../db/index';
import errorsMessages from '../../utils/customErrors/errors';

const deleteCopyBook: HandlerAddCopyBookType = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;

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
    cart.quantityOfGoods = +num - 1;

    if (cart.quantityOfGoods === 0) {
      await db.cart.remove(cart);
    } else {
      await db.cart.save(cart);
    }
    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default deleteCopyBook;
