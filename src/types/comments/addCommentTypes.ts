import type { RequestHandler } from 'express';
import type Book from 'src/db/entities/bookStore/Book';
import type UserComment from 'src/db/entities/bookStore/UserComment';
import type User from 'src/db/entities/User';
import type { ParamsType, QueryType } from '../emptyType';

type ResponseType = UserComment;

type BodyType = {
  userId: User['id'];
  bookId: Book['id'];
  text: string;
};

export type HandlerAddCommentType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;
