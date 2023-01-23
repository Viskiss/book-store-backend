import type { RequestHandler } from 'express';

import type Cart from 'src/db/entities/bookStore/Cart';
import type User from 'src/db/entities/User';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;

type QueryType = {
  userId: User['id'];
};

type ResType = {
  books: Cart[];
};

export type HandlerGetBooksCartType = RequestHandler< ParamsType, ResType, BodyType, QueryType>;
