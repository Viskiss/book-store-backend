import type { Handler } from 'express';
import bcrypt from 'bcrypt';
import {
  StatusCodes,
} from 'http-status-codes';
import errorsMessages from '../utils/customErrors/errors';
import succsessMessages from '../utils/customErrors/success';
import userDb from '../db/index';
import hashPassword from '../utils/hashPassword';
import CustomError from '../utils/customErrors/customErrors';

const updatePassword: Handler = async (req, res, next) => {
  try {
    const password = req.body.password;
    const id = req.user;
    if (!password) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.NEED_PASS,
      );
    }

    const existingUser = await userDb.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      const newPassword = hashPassword.hash(password);
      existingUser.password = (await newPassword).toString();
    } else {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        errorsMessages.NEED_NEW_PASS,
      );
    }

    await userDb.repository.save(existingUser);

    if (!existingUser) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.ID_NOT_FOUND,
      );
    }

    res.status(StatusCodes.OK).json(succsessMessages.PASS_CHANGED);
  } catch (error) {
    next(error);
  }
};

export default updatePassword;
