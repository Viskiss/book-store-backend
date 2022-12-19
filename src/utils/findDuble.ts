import {
  StatusCodes,
} from 'http-status-codes';
import db from '../db/index';
import CustomError from './customErrors/customErrors';
import errorsMessages from '../utils/customErrors/errors';

export const findDubleEmail = async (email: string) => {
  const user = await db.user.findOne({ where: { email } });

  if (user) {
    throw new CustomError(
      StatusCodes.METHOD_NOT_ALLOWED,
      errorsMessages.DUBLE_EMAIL,
    );
  }

  return email;
};
