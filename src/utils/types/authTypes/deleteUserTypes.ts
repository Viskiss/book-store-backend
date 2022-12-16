import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';

type SingInType = {
  id: User['id'];
};

type ResType = {
  succsess: string;
};

type QueryType = Record<string, never>;

export type HandlerDeleteUserType = RequestHandler<QueryType, ResType, SingInType>;
