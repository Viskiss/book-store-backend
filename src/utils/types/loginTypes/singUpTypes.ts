import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';

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

type QueryType = Record<string, never>;

export type HandlerSingUpType = RequestHandler<QueryType, ResType, SingUpType>;
