import type { HandlerAddLikedBookType } from 'src/types/likedBooks/addLikedBook';
import LikedBook from '../../db/entities/bookStore/LikedBook';

import db from '../../db/index';

const addLikedBook: HandlerAddLikedBookType = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const likedBook = new LikedBook();
    likedBook.bookId = bookId;
    likedBook.userId = req.user.id;

    await db.likedBook.save(likedBook);

    const likedBooks = await db.likedBook
      .createQueryBuilder('likedBooks')
      .where('likedBooks.userId = :userId', { userId: req.user.id })
      .leftJoinAndSelect('likedBooks.book', 'book')
      .getMany();

    return res.json({ books: likedBooks });
  } catch (err) {
    next(err);
  }
};

export default addLikedBook;
