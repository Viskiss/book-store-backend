import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/book/Book';
import type Genre from 'src/db/entities/book/Genre';

type ParamsType = Record<string, never>;
type BodyType = Record<string, never>;

type QueryType = {
  filters: {
    genre?: Genre['name'];
    select?: string;
    search?: string;
    page?: number;
    minPrice?: number;
    maxPrice?: number;
  };
};

type ResType = {
  books: Book[];
};

export type HandlerFilterBooksType = RequestHandler<
ParamsType, ResType, BodyType, QueryType
>;
