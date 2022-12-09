/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import config from '../config';

function match(password: string, exPass: string) {
  console.log(password, exPass);
  return bcrypt.compare(password, exPass);
}

function hash(password: string) {
  return bcrypt.hash(password, +config.verify.passwordSalt);
}
export default { match, hash };
