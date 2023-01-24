import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';
import type { QueryType } from './emptyType';

type SingInType = {
  email: User['email'];
  password: User['password'];
};

type ResType = {
  user: User;
  token: string | object;
};

export type HandlerSingInType = RequestHandler<QueryType, ResType, SingInType>;
