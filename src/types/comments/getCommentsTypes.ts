import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type UserComment from 'src/db/entities/bookStore/UserComment';
import type { BodyType, QueryType } from '../emptyType';

type ResponseType = UserComment[];

type ParamsType = {
  bookId: Book['id'];
};

export type HandlerGetCommentsType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;
