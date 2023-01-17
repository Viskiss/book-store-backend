import type { RequestHandler } from 'express';
import type Book from 'src/db/entities/book/Book';
import type { QueryType } from '../queryType';

type BooksType = {
  books: Book[];
};

export type HandlerGetBooksType = RequestHandler<QueryType, BooksType>;
