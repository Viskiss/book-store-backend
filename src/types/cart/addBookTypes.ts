import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type Cart from 'src/db/entities/bookStore/Cart';
import type User from 'src/db/entities/User';
import type { QueryType } from '../emptyType';

type SelectBookType = {
  userId: User['id'];
  bookId: Book['id'];
};

type ResponseType = {
  books: Cart[];
};

export type HandlerAddBookType = RequestHandler<QueryType, ResponseType, SelectBookType>;
