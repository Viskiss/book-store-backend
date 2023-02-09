import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type BookRate from 'src/db/entities/bookStore/BookRate';
import type User from 'src/db/entities/User';

import type { BodyType, ParamsType, QueryType } from '../emptyType';

type BodyAddBookType = {
  rate: number;
  bookId: Book['id'];
  userId: User['id'];
};

type ResponseGetRateType = BookRate;

type ParamsGetRateType = {
  bookId: Book['id'];
  userId: User['id'];
};

type ResponseRateType = {
  id: number;
  bookId: number;
  userId: number;
  rate: number;
};

export type HandlerGetBookRateType = RequestHandler<
ParamsGetRateType,
ResponseGetRateType,
BodyType,
QueryType
>;

export type HandlerAddBookRateType = RequestHandler<
ParamsType,
ResponseRateType,
BodyAddBookType,
QueryType
>;
