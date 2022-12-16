import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';

type SingInType = {
  id: User['id'];
};

type ResType = {
  user: User;
};

type QueryType = Record<string, never>;

export type HandlerCurrentUserType = RequestHandler<QueryType, ResType, SingInType>;
