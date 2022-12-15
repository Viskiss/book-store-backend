import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import jwtToken from '../utils/jwt.token';

const auth: Handler = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const payload = jwtToken.parseJwt(token);
    req.user = payload.id;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Error, authorization failed' });
  }
};

export default auth;
