import type { RequestHandler } from 'express';

import type Cart from 'src/db/entities/bookStore/Cart';
import type { BodyType, QueryType } from '../emptyType';

type ParamsType = {
  cartId: Cart['id'];
};

type ResponseType = {
  books: Cart[];
};

export type HandlerDeleteBookType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;
