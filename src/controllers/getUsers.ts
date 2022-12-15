import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import db from '../db/index';

const getUser: Handler = async (req, res, next) => {
  try {
    const allUsers = await db.user.find();
    res.status(StatusCodes.OK).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export default getUser;
