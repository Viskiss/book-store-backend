import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type BookRate from 'src/db/entities/bookStore/BookRate';
import type User from 'src/db/entities/User';
import type { BodyType, QueryType } from '../emptyType';

type ResponseType = BookRate;

type ParamsType = {
  bookId: Book['id'];
  userId: User['id'];
};

export type HandlerGetBookRateType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;
