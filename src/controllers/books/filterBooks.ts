import { StatusCodes } from 'http-status-codes';

import type { HandlerFilterBooksType } from 'src/types/books';

import db from '../../db/index';

const filterGenre: HandlerFilterBooksType = async (req, res, next) => {
  try {
    const { genre, search, select } = req.query;
    const page = Number(req.query.page);
    let filterSelect;

    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const arrGenre = genre?.split(',');

    switch (select) {
    case 'Price':
      filterSelect = 'price';
      break;
    case 'Name':
      filterSelect = 'title';
      break;
    case 'Author name':
      filterSelect = 'author';
      break;
    case 'Rating':
      filterSelect = 'rate';
      break;
    case 'Date of issue':
      filterSelect = 'date';
      break;
    default:
      break;
    }

    const filtredBooks = db.book
      .createQueryBuilder('book')
      .where('book.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      })
      .orderBy(`book.${filterSelect}`, 'ASC');

    if (genre.length) {
      filtredBooks.innerJoinAndSelect(
        'book.genre',
        'genre',
        'genre.name IN (:...arrGenre)',
        { arrGenre },
      );
    }

    if (search) {
      filtredBooks.andWhere(
        'book.title ILIKE :search OR book.author ILIKE :search',
        { search: `%${search}%` },
      );
    }

    const counter = (await filtredBooks.getMany()).length;
    const books = await filtredBooks
      .take(12)
      .skip((page - 1) * 12)
      .getMany();

    res.status(StatusCodes.OK)
      .json({ books, counterBooks: counter, numberPages: 12 });
  } catch (error) {
    next(error);
  }
};

export default filterGenre;
