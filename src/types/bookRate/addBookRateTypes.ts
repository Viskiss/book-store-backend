import type { RequestHandler } from 'express';
import type Book from 'src/db/entities/bookStore/Book';
import type User from 'src/db/entities/User';
import type { ParamsType, QueryType } from '../emptyType';

type BodyType = {
  rate: number;
  bookId: Book['id'];
  userId: User['id'];
};

export type HandlerAddBookRateType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;
