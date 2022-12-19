import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';
import type { QueryType } from '../queryType';

type UpdateUserType = {
  password: User['password'];
};

type ResType = {
  message: string;
};

export type HandlerUpdatePasswordType = RequestHandler<QueryType, ResType, UpdateUserType>;
