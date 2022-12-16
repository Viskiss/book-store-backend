import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';

type SingUpType = {
  password: User['password'];
};

type ResType = {
  message: string;
};

type QueryType = Record<string, never>;

export type HandlerUpdatePasswordType = RequestHandler<QueryType, ResType, SingUpType>;
