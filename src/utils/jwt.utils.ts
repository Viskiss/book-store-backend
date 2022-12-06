import jwt from 'jsonwebtoken';

const getTokens = (email: string) => ({
  accessToken: jwt.sign({ email }, process.env.TOKEN_SECRET, {
    expiresIn: '30m',
  }),
  refreshToken: jwt.sign({ email }, process.env.TOKEN_SECRET, {
    expiresIn: '30d',
  }),
});

export default {
  getTokens,
};
