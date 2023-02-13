import type { HandlerAddCommentType } from 'src/types';

import type { ParamsGetCommentType } from 'src/types/comments/index';
import UserComment from '../../../db/entities/bookStore/UserComment';

import db from '../../../db';

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

const getCommentsWithSocket = async (data: ParamsGetCommentType) => {
  try {
    const { bookId } = data;

    const userComments = await db.comment
      .createQueryBuilder('comment')
      .where('comment.bookId = :bookId', { bookId })
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();

    return userComments;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export default { addComment, getCommentsWithSocket };
