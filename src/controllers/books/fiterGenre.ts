import {
  StatusCodes,
} from 'http-status-codes';

import type { HandlerFilterBooksType } from 'src/types/books/filterBooks';

import db from '../../db/index';

const filterGenre: HandlerFilterBooksType = async (req, res, next) => {
  try {
    const nameFilter: string = req.params.filter;

    const stringGenre = nameFilter.split(',');

    const filter = await db.book
      .createQueryBuilder('books')
      .innerJoinAndSelect(
        'books.genre',
        'genre',
        'genre.name IN (:...stringGenre)',
        { stringGenre },
      )
      .getMany();

    res.status(StatusCodes.OK).json({ books: filter });
  } catch (error) {
    next(error);
  }
};

export default filterGenre;
