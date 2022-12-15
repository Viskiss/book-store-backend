import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import errorsMessages from '../utils/customErrors/errors';
import hashPassword from '../utils/hashPassword';
import createToken from '../utils/jwt.token';
import userDb from '../db/index';
import CustomError from '../utils/customErrors/customErrors';

const singIn: Handler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userDb.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!existingUser) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.EMAIL_NOT_FOUND,
      );
    }

    const matchPassword = await hashPassword.match(password, existingUser.password);

    if (matchPassword === false) {
      throw new CustomError(
        StatusCodes.CONFLICT,
        errorsMessages.INVALID_CREDENTIALS,
      );
    }

    const token = createToken.getToken(existingUser.id);

    const userData = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      dob: existingUser.dob,
    };

    res.status(StatusCodes.CREATED).json({ user: userData, token });
  } catch (error) {
    next(error);
  }
};

export default singIn;
