import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerCurrentUserType } from 'src/types/authTypes/currentUserTypes';
import config from '../../config';

const getCurrentUser: HandlerCurrentUserType = async (req, res, next) => {
  try {
    req.user.avatar = `${config.server.currentUrl}/avatars/${req.user.avatar}`;
    res.status(StatusCodes.OK).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

export default getCurrentUser;
