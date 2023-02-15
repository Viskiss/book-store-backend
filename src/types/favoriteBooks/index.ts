import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type LikedBook from 'src/db/entities/bookStore/LikedBook';

import type { BodyType, ParamsType, QueryType } from '../emptyType';

type ParamsAddBookType = {
  bookId: Book['id'];
};

type ResponseType = {
  books: LikedBook[];
};

export type HandlerGetLikedBooksType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;

export type HandlerAddLikedBookType = RequestHandler<
ParamsAddBookType,
ResponseType,
BodyType,
QueryType
>;

export type HandlerDeleteLikedBookType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;
