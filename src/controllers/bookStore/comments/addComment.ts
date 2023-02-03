import type { HandlerAddCommentType } from 'src/types';

import UserComment from '../../../db/entities/bookStore/UserComment';

import db from '../../../db/index';

const addComment: HandlerAddCommentType = async (req, res, next) => {
  try {
    const { text, bookId, userId } = req.body;

    const comment = new UserComment();
    comment.bookId = bookId;
    comment.userId = userId;
    comment.text = text;

    await db.comment.save(comment);

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

export default addComment;
