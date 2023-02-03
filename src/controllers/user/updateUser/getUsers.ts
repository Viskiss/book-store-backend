import {
  StatusCodes,
} from 'http-status-codes';

import type { HandlerGetUsersType } from 'src/types';

import db from '../../../db/index';

const getUser: HandlerGetUsersType = async (req, res, next) => {
  try {
    const allUsers = await db.user.find();
    res.status(StatusCodes.OK).json({ users: allUsers });
  } catch (error) {
    next(error);
  }
};

export default getUser;
