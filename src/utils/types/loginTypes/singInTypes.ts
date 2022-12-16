import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';

type SingInType = {
  email: User['email'];
  password: User['password'];
};

type ResType = {
  User: User;
  token: string | object;
};

type QueryType = Record<string, never>;

export type HandlerSingInType = RequestHandler<QueryType, ResType, SingInType>;
