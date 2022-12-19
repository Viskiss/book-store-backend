import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';
import type { QueryType } from '../queryType';

type UsersType = {
  users: User[];
};

export type HandlerGetUsersType = RequestHandler<QueryType, UsersType>;
