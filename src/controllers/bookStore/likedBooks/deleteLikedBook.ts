import type { HandlerDeleteLikedBookType } from 'src/types';

import db from '../../../db';

const deleteLikedBook: HandlerDeleteLikedBookType = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const unLiked = await db.likedBook
      .createQueryBuilder('likedBook')
      .where('likedBook.bookId = :bookId', { bookId })
      .getOne();

    await db.likedBook.remove(unLiked);

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

export default deleteLikedBook;
