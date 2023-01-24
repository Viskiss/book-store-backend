import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';
import type { QueryType } from './emptyType';

type SingUpType = {
  fullName: User['fullName'];
  dob: User['dob'];
  email: User['email'];
  password: User['password'];
};

type ResType = {
  user: User;
  token: string;
};

export type HandlerSingUpType = RequestHandler<QueryType, ResType, SingUpType>;
