import type { Socket } from 'socket.io';
import type { DefaultEventsMap } from 'node_modules/socket.io/dist/typed-events';

import type { BodyAddCommentType } from 'src/types/comments/index';
import UserComment from '../../../db/entities/bookStore/UserComment';

import db from '../../../db';

const addCommentsSocket = async (data: BodyAddCommentType) => {
  try {
    const { text, bookId, userId } = data;

    const comment = new UserComment();
    comment.bookId = bookId;
    comment.userId = userId;
    comment.text = text;

    await db.comment.save(comment);

    const commentId = comment.id;

    const userComment = await db.comment
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id: commentId })
      .leftJoinAndSelect('comment.user', 'user')
      .getOne();

    return userComment;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

const socketAddComment = (socket: Socket<DefaultEventsMap>) => {
  socket.on('addComment', async (data) => {
    const comment = await addCommentsSocket(data);
    socket.nsp.emit('getComment', comment);
  });
};

export default { socketAddComment };
