import { StatusCodes } from 'http-status-codes';

import type { HandlerAddCommentType } from 'src/types/comments/addCommentTypes';
import UserComment from '../../db/entities/bookStore/UserComment';

import db from '../../db/index';

const addComment: HandlerAddCommentType = async (req, res, next) => {
  try {
    const { text, bookId, userId } = req.body;

    const comment = new UserComment();
    comment.bookId = bookId;
    comment.userId = userId;
    comment.text = text;

    await db.comment.save(comment);

    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default addComment;
