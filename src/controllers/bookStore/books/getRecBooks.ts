import type { HandlerGetRecBooksType } from 'src/types/books';

import db from '../../../db';

const getRecommendedBooks: HandlerGetRecBooksType = async (req, res, next) => {
  try {
    const books = await db.book.createQueryBuilder('books').getMany();

    const recBooks = books
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    return res.json({ books: recBooks });
  } catch (err) {
    next(err);
  }
};

export default getRecommendedBooks;
