import bcrypt from 'bcrypt';
import {
  StatusCodes,
} from 'http-status-codes';

import type { HandlerUpdatePasswordType } from 'src/types';
import errorsMessages from '../../../utils/customErrors/errors';
import succsessMessages from '../../../utils/customErrors/success';
import hashPassword from '../../../utils/hashPassword';
import CustomError from '../../../utils/customErrors/customErrors';

import db from '../../../db/index';

const updatePassword: HandlerUpdatePasswordType = async (req, res, next) => {
  try {
    const password = req.body.password;
    const newPasswordUser = req.body.newPassword;
    const id = req.user.id;

    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    const currentUserPassword = await bcrypt.compare(password, user.password);

    if (currentUserPassword) {
      const matchPassword = await bcrypt.compare(newPasswordUser, user.password);

      if (!matchPassword) {
        const newPassword = await hashPassword.hash(newPasswordUser);
        user.password = newPassword.toString();
      } else {
        throw new CustomError(
          StatusCodes.BAD_REQUEST,
          errorsMessages.NEED_NEW_PASS,
        );
      }

      await db.user.save(user);

      res.status(StatusCodes.OK).json({ message: succsessMessages.PASS_CHANGED });
    } else {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        errorsMessages.MATCH_PASSWORD,
      );
    }
  } catch (error) {
    next(error);
  }
};

export default updatePassword;
