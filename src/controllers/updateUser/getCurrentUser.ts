import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerCurrentUserType } from 'src/types/userTypes';

const getCurrentUser: HandlerCurrentUserType = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

export default getCurrentUser;
