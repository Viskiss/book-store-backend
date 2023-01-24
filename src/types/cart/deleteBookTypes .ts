import type { RequestHandler } from 'express';
import type Book from 'src/db/entities/bookStore/Book';
import type { QueryType } from '../emptyType';

type SelectBookType = {
  bookId: Book['id'];
};

export type HandlerDeleteBookType = RequestHandler<QueryType, SelectBookType>;
