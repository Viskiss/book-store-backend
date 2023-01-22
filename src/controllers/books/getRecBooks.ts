import type { HandlerGetRecBooksType } from 'src/types/books/getRecBooks';
import db from '../../db/index';

export const getRecommendedBooks: HandlerGetRecBooksType = async (req, res, next) => {
  try {
    const { id } = req.query;

    const books = await db.book
      .createQueryBuilder('books')
      .getMany();

    const recBooks = books.filter((item) => item.id !== Number(id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    return res.json({ books: recBooks });
  } catch (err) {
    next(err);
  }
};
