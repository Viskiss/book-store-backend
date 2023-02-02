import type { RequestHandler } from 'express';
import type User from 'src/db/entities/User';
import type { BodyType, ParamsType, QueryType } from '../emptyType';

type BodyCurrentUserType = {
  id: User['id'];
  avatar: string;
};

type ResponseCurrentUserType = {
  user: User;
};

type BodyDeleteUserType = {
  id: User['id'];
};

type ResponseDeleteUserType = {
  succsess: string;
};

type ResponseUsersType = {
  users: User[];
};

type BodyUpdateUserType = {
  password: User['password'];
  newPassword: string;
};

type ResponsePasswordType = {
  message: string;
};

type BodyUpdatePasswordType = {
  fullName: User['fullName'];
  dob: User['dob'];
  email: User['email'];
};

type ResponseUpdateUserType = {
  user: User;
};

export type HandlerUpdateUserType = RequestHandler<
ParamsType,
ResponseUpdateUserType,
BodyUpdatePasswordType,
QueryType
>;

export type HandlerUpdatePasswordType = RequestHandler<
ParamsType,
ResponsePasswordType,
BodyUpdateUserType,
QueryType
>;

export type HandlerGetUsersType = RequestHandler<
ParamsType,
ResponseUsersType,
BodyType,
QueryType
>;

export type HandlerDeleteUserType = RequestHandler<
ParamsType,
ResponseDeleteUserType,
BodyDeleteUserType,
QueryType
>;

export type HandlerCurrentUserType = RequestHandler<
ParamsType,
ResponseCurrentUserType,
BodyCurrentUserType,
QueryType
>;
