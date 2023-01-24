import type { RequestHandler } from 'express';
import type Book from 'src/db/entities/bookStore/Book';
import type { QueryType } from '../emptyType';

type SelectBookType = {
  id: Book['id'];
};

type ResType = {
  book: Book;
};

export type HandlerShowBookType = RequestHandler<QueryType, ResType, SelectBookType>;
