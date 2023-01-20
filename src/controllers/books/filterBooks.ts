import {
  StatusCodes,
} from 'http-status-codes';

import type { HandlerFilterBooksType } from 'src/types/books/filterBooks';

import db from '../../db/index';

const filterGenre: HandlerFilterBooksType = async (req, res, next) => {
  try {
    // const { genre, search, select } = req.query.filters;
    let filterSelect;

    // const minPrice = 50;
    // const maxPrice = 60;
    // const arrGenre = genre.split(',');

    // switch (select) {
    // case 'Price':
    //   filterSelect = 'price';
    //   break;
    // case 'Name':
    //   filterSelect = 'title';
    //   break;
    // case 'Author name':
    //   filterSelect = 'author';
    //   break;
    // case 'Rating':
    //   filterSelect = 'rate';
    //   break;
    // case 'Date of issue':
    //   filterSelect = 'date';
    //   break;
    // default: break;
    // }

    // const bookId = 394;
    const search = 'Ruin and Rising';

    const filterBooks = await db.book
      .createQueryBuilder('book')
      // .where('book.price BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice })
      // .orderBy(`book.${filterSelect}`, 'ASC')
      // .innerJoinAndSelect(
      //   'book.genre',
      //   'genre',
      //   'genre.name IN (:...arrGenre)',
      //   { arrGenre },
      // )
      // .where('book.title IN (:...title)', { title: search })
      .where('book.title ILIKE :search', { search })
      // .where('book.id = :bookId', { bookId })
      .getMany();
      // eslint-disable-next-line no-console
    console.log(search);
    // eslint-disable-next-line no-console
    console.log(filterBooks);
    res.status(StatusCodes.OK).json({ books: filterBooks });
  } catch (error) {
    next(error);
  }
};

export default filterGenre;
