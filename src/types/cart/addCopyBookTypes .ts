import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type { BodyType, QueryType, ResponseType } from '../emptyType';

type ParamsType = {
  bookId: Book['id'];
};

export type HandlerAddCopyBookType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;
