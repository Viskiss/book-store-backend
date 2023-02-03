import type { RequestHandler } from 'express';

import type Book from 'src/db/entities/bookStore/Book';
import type Genre from 'src/db/entities/bookStore/Genre';

import type { BodyType, ParamsType, QueryType } from '../emptyType';

type QueryFilterType = {
  genre?: Genre['name'];
  select?: string;
  search?: string;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
};

type ResponseFilterType = {
  books: Book[];
  counterBooks: number;
  numberPages: number;
};

type ResponseGetBookType = {
  books: Book[];
};

type ResponseGenresType = {
  genres: Genre[];
};

type ResponseGetRecType = {
  books: Book[];
};

type ParamsSelectBookType = {
  bookId: Book['id'];
};

type ResponseShowType = {
  book: Book;
};

export type HandlerShowBookType = RequestHandler<
ParamsSelectBookType,
ResponseShowType,
BodyType,
QueryType
>;

export type HandlerGetRecBooksType = RequestHandler<
ParamsType,
ResponseGetRecType,
BodyType,
QueryType
>;

export type HandlerGetGenresType = RequestHandler<
ParamsType,
ResponseGenresType,
BodyType,
QueryType
>;

export type HandlerGetBooksType = RequestHandler<
ParamsType,
ResponseGetBookType,
BodyType,
QueryType
>;

export type HandlerFilterBooksType = RequestHandler<
ParamsType,
ResponseFilterType,
BodyType,
QueryFilterType
>;
