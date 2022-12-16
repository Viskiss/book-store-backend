import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';

type ResType = {
  users: User[];
};

type QueryType = Record<string, never>;

export type HandlerGetUsersType = RequestHandler<QueryType, ResType>;
