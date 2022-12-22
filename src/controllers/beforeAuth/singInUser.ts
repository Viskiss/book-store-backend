import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerSingInType } from 'src/types/singInTypes';
import errorsMessages from '../../utils/customErrors/errors';
import hashPassword from '../../utils/hashPassword';
import createToken from '../../utils/jwtToken';
import db from '../../db/index';
import CustomError from '../../utils/customErrors/customErrors';

const singIn: HandlerSingInType = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.EMAIL_NOT_FOUND,
      );
    }

    const matchPassword = await hashPassword.match(password, user.password);

    if (!matchPassword) {
      throw new CustomError(
        StatusCodes.CONFLICT,
        errorsMessages.INVALID_CREDENTIALS,
      );
    }

    const token = createToken.createToken(user.id);

    delete user.password;
    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export default singIn;
