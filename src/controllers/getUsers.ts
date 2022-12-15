import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import userDb from '../db/index';

const getUser: Handler = async (req, res, next) => {
  try {
    const allUsers = await userDb.repository.find();
    res.status(StatusCodes.OK).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export default getUser;
