import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';
import type { QueryType } from './queryType';

type SingInType = {
  email: User['email'];
  password: User['password'];
};

type ResType = {
  User: User;
  token: string | object;
};

export type HandlerSingInType = RequestHandler<QueryType, ResType, SingInType>;
