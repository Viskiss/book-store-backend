import type { RequestHandler } from 'express';
import type Book from 'src/db/entities/Book';
import type { QueryType } from '../queryType';

type UsersType = {
  books: Book[];
};

export type HandlerGetBooksType = RequestHandler<QueryType, UsersType>;
