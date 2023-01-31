import type { RequestHandler } from 'express';

import type LikedBook from 'src/db/entities/bookStore/LikedBook';
import type { BodyType, ParamsType, QueryType } from '../emptyType';

type ResponseType = {
  books: LikedBook[];
};

export type HandlerGetLikedBooksType = RequestHandler<
ParamsType,
ResponseType,
BodyType,
QueryType
>;
