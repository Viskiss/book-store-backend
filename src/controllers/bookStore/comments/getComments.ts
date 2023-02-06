import type { HandlerGetCommentsType } from 'src/types';

import db from '../../../db';

const getComments: HandlerGetCommentsType = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const resUserComment = await db.comment
      .createQueryBuilder('comment')
      .where('comment.bookId = :bookId', { bookId })
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();

    return res.json(resUserComment);
  } catch (err) {
    next(err);
  }
};

export default getComments;
