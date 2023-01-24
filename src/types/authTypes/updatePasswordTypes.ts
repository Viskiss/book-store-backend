import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';
import type { QueryType } from '../emptyType';

type UpdateUserType = {
  password: User['password'];
  newPassword: string;
};

type ResType = {
  message: string;
};

export type HandlerUpdatePasswordType = RequestHandler<QueryType, ResType, UpdateUserType>;
