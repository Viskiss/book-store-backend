import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';
import type { QueryType } from '../queryType';

type CurrentUserType = {
  id: User['id'];
};

type ResType = {
  user: User;
};

export type HandlerCurrentUserType = RequestHandler<QueryType, ResType, CurrentUserType>;
