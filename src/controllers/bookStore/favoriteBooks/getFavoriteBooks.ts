import { StatusCodes } from 'http-status-codes';

import type { HandlerGetLikedBooksType } from '../../../types/favoriteBooks/index';
import CustomError from '../../../utils/customErrors/customErrors';
import errorsMessages from '../../../utils/customErrors/errors';

import db from '../../../db';

export const getFavoriteBooks: HandlerGetLikedBooksType = async (
  req,
  res,
  next,
) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.USER_NOT_FOUND,
      );
    }

    const likedBooks = await db.likedBook
      .createQueryBuilder('likedBooks')
      .where('likedBooks.userId = :userId', { userId })
      .leftJoinAndSelect('likedBooks.book', 'book')
      .getMany();

    return res.json({ books: likedBooks });
  } catch (err) {
    next(err);
  }
};

export default getFavoriteBooks;
