import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import CustomError from '../utils/customErrors/customErrors';
import errorsMessages from '../utils/customErrors/errors';
import jwtToken from '../utils/jwt.token';

const auth: Handler = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new CustomError(
        StatusCodes.FORBIDDEN,
        errorsMessages.TOKEN_NOT_FOUND,
      );
    }

    const payload = jwtToken.parseJwt(token);
    req.user = payload.id;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
