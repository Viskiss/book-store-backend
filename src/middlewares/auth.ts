import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { Handler } from 'express';

import config from '../config';
// import type User from '../db/entities/User';

// export interface ICustomRequest extends Request {
//   user: string | JwtPayload;
// }

const auth: Handler = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, config.jwtSecret) as {id: number};
    // req.user = decoded.id;
    next();
    // eslint-disable-next-line no-console
    console.log(decoded.id);
  } catch (error) {
    res.status(401).send('Unahtorized');
  }
};

export default auth;
