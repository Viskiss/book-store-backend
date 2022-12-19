import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';
import type { QueryType } from '../queryType';

type SingUpType = {
  fullName: User['fullName'];
  dob: User['dob'];
  email: User['email'];
};

type ResType = {
  user: User;
};

export type HandlerUpdateUserType = RequestHandler<QueryType, ResType, SingUpType>;
