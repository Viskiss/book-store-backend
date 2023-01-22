import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type Genre from 'src/db/entities/bookStore/Genre';

type ParamsType = Record<string, never>;
type BodyType = Record<string, never>;

type QueryType = {
  genre?: Genre['name'];
  select?: string;
  search?: string;
  page?: number;
  minPrice?: number;
  maxPrice?: number;

};

type ResType = {
  books: Book[];
  counterBooks: number;
  numberPages: number;
};

export type HandlerFilterBooksType = RequestHandler<
ParamsType, ResType, BodyType, QueryType
>;
