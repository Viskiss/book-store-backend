import jwt from 'jsonwebtoken';
import config from '../config';

const getToken = (id: number) => ({
  accessToken: jwt.sign({ id }, config.verify.jwtSecret, {
    expiresIn: '30m',
  }),
});

function parseJwt(token: string) {
  return jwt.verify(token, config.verify.jwtSecret) as { id: number };
}

function matchJwtId(curId: number, exId: number) {
  const curToken = getToken(curId);
  const exToken = getToken(exId);
  if (parseJwt(curToken.accessToken).id === parseJwt(exToken.accessToken).id) {
    return true;
  }
}

export default {
  getToken, parseJwt, matchJwtId,
};
