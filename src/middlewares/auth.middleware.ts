import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

import config from '../config';

export interface ICustomRequest extends Request {
  token: string | JwtPayload;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    next();
    (req as ICustomRequest).token = decoded;
  } catch (error) {
    res.status(401).send('Unahtorized');
  }
};

export default auth;
