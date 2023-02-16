import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type Cart from 'src/db/entities/bookStore/Cart';
import type User from 'src/db/entities/User';

import type { BodyType, ParamsType, QueryType } from '../emptyType';

type BodyAddBookType = {
  userId: User['id'];
  bookId: Book['id'];
};

type ResponseAddBookType = {
  books: Cart[];
};

type ParamsChangeCopyType = {
  mark: number;
  bookId: Book['id'];
};

type ResponseAddCopyType = {
  books: Cart[];
};

type ParamsDeleteType = {
  cartId: Cart['id'];
};

type ResponseDeleteBookType = {
  books: Cart[];
};

type QueryGetBooksType = {
  userId: User['id'];
};

type ResponseGetBookType = {
  books: Cart[];
};

export type HandlerGetBooksCartType = RequestHandler<
ParamsType,
ResponseGetBookType,
BodyType,
QueryGetBooksType
>;

export type HandlerDeleteBookType = RequestHandler<
ParamsDeleteType,
ResponseDeleteBookType,
BodyType,
QueryType
>;

export type HandlerChangeCopyBookType = RequestHandler<
ParamsChangeCopyType,
ResponseAddCopyType,
BodyType,
QueryType
>;

export type HandlerAddBookType = RequestHandler<
ParamsType,
ResponseAddBookType,
BodyAddBookType,
QueryType
>;
