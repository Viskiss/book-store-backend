import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';

type SingUpType = {
  fullName: User['fullName'];
  dob: User['dob'];
  email: User['email'];
};

type ResType = {
  user: User;
};

type QueryType = Record<string, never>;

export type HandlerUpdateUserType = RequestHandler<QueryType, ResType, SingUpType>;
