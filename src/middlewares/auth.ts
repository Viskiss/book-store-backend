import jwt from 'jsonwebtoken';
import type { Handler } from 'express';

import config from '../config';

const auth: Handler = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, config.verify.jwtSecret) as {id: number};
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).send('Unahtorized');
  }
};

export default auth;
