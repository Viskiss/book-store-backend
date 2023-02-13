import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type UserComment from 'src/db/entities/bookStore/UserComment';
import type User from 'src/db/entities/User';

import type { BodyType, ParamsType, QueryType } from '../emptyType';

type ResponseType = UserComment[];

type BodyAddCommentType = {
  userId: User['id'];
  bookId: Book['id'];
  text: string;
};

export type ParamsGetCommentType = {
  bookId: Book['id'];
};

export type HandlerAddCommentType = RequestHandler<
ParamsType,
ResponseType,
BodyAddCommentType,
QueryType
>;

export type HandlerGetCommentsType = RequestHandler<
ParamsGetCommentType,
ResponseType,
BodyType,
QueryType
>;
