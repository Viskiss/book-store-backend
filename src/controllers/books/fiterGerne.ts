import {
  StatusCodes,
} from 'http-status-codes';

import type { HandlerFilterBooksType } from 'src/types/books/filterBooks';

import db from '../../db/index';

const filterGerne: HandlerFilterBooksType = async (req, res, next) => {
  try {
    const nameFilter = req.params.filter;

    const filterGenre = await db.book.find({
      relations: ['genre'],
      where: { genre: { name: nameFilter } },
    });

    res.status(StatusCodes.OK).json({ books: filterGenre });
  } catch (error) {
    next(error);
  }
};

export default filterGerne;
