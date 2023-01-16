import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerShowBookType } from '../../types/books/showSelectBook';
import db from '../../db/index';
import CustomError from '../../utils/customErrors/customErrors';
import errorsMessages from '../../utils/customErrors/errors';

const showSelectBook: HandlerShowBookType = async (req, res, next) => {
  try {
    const id = +req.params.bookId;
    const book = await db.book.findOneBy({ id });
    if (!book) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.BOOK_NOT_FOUND,
      );
    }
    res.status(StatusCodes.OK).json({ book });
  } catch (error) {
    next(error);
  }
};

export default showSelectBook;
