import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';
import type { QueryType } from '../queryType';

type SingInType = {
  id: User['id'];
};

type ResType = {
  succsess: string;
};

export type HandlerDeleteUserType = RequestHandler<QueryType, ResType, SingInType>;
