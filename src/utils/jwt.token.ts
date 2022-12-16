import jwt from 'jsonwebtoken';
import config from '../config';

const createToken = (id: number) => {
  return jwt.sign({ id }, config.verify.jwtSecret, {
    expiresIn: '30m',
  });
};

function parseJwt(token: string) {
  return jwt.verify(token, config.verify.jwtSecret) as { id: number };
}

export default {
  createToken, parseJwt,
};
