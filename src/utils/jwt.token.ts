import jwt from 'jsonwebtoken';
import config from '../config';

const getToken = (id: number) => ({
  accessToken: jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '30m',
  }),
});

function parseJwt(token: string) {
  return jwt.verify(token, config.jwtSecret) as { id: number };
}

export default {
  getToken, parseJwt,
};
