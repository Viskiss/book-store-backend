import type { RequestHandler } from 'express';
import type Genre from 'src/db/entities/book/Genre';

import type { QueryType } from '../queryType';

type GenresType = {
  genres: Genre[];
};

export type HandlerGetGenresType = RequestHandler<QueryType, GenresType>;
