import type { RequestHandler } from 'express';
import type Book from 'src/db/entities/bookStore/Book';
import type { QueryType } from '../queryType';

type BooksType = {
  books: Book[];
};

export type HandlerGetRecBooksType = RequestHandler<QueryType, BooksType>;
