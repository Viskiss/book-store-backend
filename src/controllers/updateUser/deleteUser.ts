import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerDeleteUserType } from 'src/types/userTypes';
import CustomError from '../../utils/customErrors/customErrors';
import errorsMessages from '../../utils/customErrors/errors';
import succsessMessages from '../../utils/customErrors/success';
import db from '../../db';

const deleteUser: HandlerDeleteUserType = async (req, res, next) => {
  try {
    const id = +req.params.userId;

    const userToRemove = await db.user.findOneBy({ id });

    if (!userToRemove) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.USER_NOT_FOUND,
      );
    }

    await db.user.remove(userToRemove);

    res.status(StatusCodes.ACCEPTED).json({ succsess: succsessMessages.USER_DELETED });
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
