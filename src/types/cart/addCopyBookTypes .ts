import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type Cart from 'src/db/entities/bookStore/Cart';
import type { BodyType, QueryType } from '../emptyType';

type ParamsType = {
  bookId: Book['id'];
};

type ResponseType = {
  books: Cart[];
};

export type HandlerAddCopyBookType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;
