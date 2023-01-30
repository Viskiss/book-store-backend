import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type User from 'src/db/entities/User';
import type { BodyType, QueryType } from '../emptyType';

type ParamsType = {
  userId: User['id'];
};

type ResponseType = {
  books: Book[];
};

export type HandlerGetRecBooksType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;
