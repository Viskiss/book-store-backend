import bcrypt from 'bcrypt';
import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerUpdatePasswordType } from 'src/types/authTypes/updatePasswordTypes';
import errorsMessages from '../../utils/customErrors/errors';
import succsessMessages from '../../utils/customErrors/success';
import db from '../../db/index';
import hashPassword from '../../utils/hashPassword';
import CustomError from '../../utils/customErrors/customErrors';

const updatePassword: HandlerUpdatePasswordType = async (req, res, next) => {
  try {
    const password = req.body.password;
    const id = req.user.id;

    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    const matchPassword = await bcrypt.compare(password, req.user.password);

    if (!matchPassword) {
      const newPassword = await hashPassword.hash(password);
      user.password = newPassword.toString();
    } else {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        errorsMessages.NEED_NEW_PASS,
      );
    }

    await db.user.save(user);

    res.status(StatusCodes.OK).json({ message: succsessMessages.PASS_CHANGED });
  } catch (error) {
    next(error);
  }
};

export default updatePassword;
