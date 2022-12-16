import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerCurrentUserType } from 'src/utils/types/authTypes/currentUserTypes';
import db from '../../db/index';

const getCurrentUser: HandlerCurrentUserType = async (req, res, next) => {
  try {
    const currentUser = await db.user.findOneBy({ id: req.user.id });
    res.status(StatusCodes.OK).json({ user: currentUser });
  } catch (error) {
    next(error);
  }
};

export default getCurrentUser;
