import type { HandlerGetRecBooksType } from 'src/types/books';

import db from '../../../db';

const getRecommendedBooks: HandlerGetRecBooksType = async (req, res, next) => {
  try {
    const userId = req.params.userId || 1;

    const books = await db.book.createQueryBuilder('books').getMany();

    const recBooks = books
      .filter((item) => item.id !== Number(userId))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    return res.json({ books: recBooks });
  } catch (err) {
    next(err);
  }
};

export default getRecommendedBooks;
