import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerCurrentUserType } from 'src/types/authTypes/currentUserTypes';

const getCurrentUser: HandlerCurrentUserType = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

export default getCurrentUser;
