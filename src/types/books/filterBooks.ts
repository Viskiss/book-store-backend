import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/book/Book';
import type Genre from 'src/db/entities/book/Genre';
import type { QueryType } from '../queryType';

type SelectBookType = {
  filter: Genre['name'];
};

type ResType = {
  books: Book[];
};

export type HandlerFilterBooksType = RequestHandler<QueryType, ResType, SelectBookType>;
