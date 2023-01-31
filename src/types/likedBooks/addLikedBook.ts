import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type LikedBook from 'src/db/entities/bookStore/LikedBook';
import type { BodyType, QueryType } from '../emptyType';

type ParamsType = {
  bookId: Book['id'];
};

type ResponseType = {
  books: LikedBook[];
};

export type HandlerAddLikedBookType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;
