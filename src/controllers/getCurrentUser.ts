import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import db from '../db/index';

const getCurrentUser: Handler = async (req, res, next) => {
  try {
    const currentUser = await db.user.findOneBy({ id: req.user.id });
    res.status(StatusCodes.OK).json(currentUser);
  } catch (error) {
    next(error);
  }
};

export default getCurrentUser;
