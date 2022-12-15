/* eslint-disable no-console */
import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import CustomError from '../utils/customErrors/customErrors';
import errorsMessages from '../utils/customErrors/errors';
import jwtToken from '../utils/jwt.token';
import db from '../db/index';

const auth: Handler = async (req, _res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.TOKEN_NOT_FOUND,
      );
    }

    const payload = jwtToken.parseJwt(token);

    req.user = await db.user.findOne({ where: { id: payload.id } });

    if (!req.user) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.USER_NOT_FOUND,
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
