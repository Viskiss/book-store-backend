import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerDeleteUserType } from 'src/utils/types/authTypes/deleteUserTypes';
import CustomError from '../../utils/customErrors/customErrors';
import errorsMessages from '../../utils/customErrors/errors';
import succsessMessages from '../../utils/customErrors/success';
import db from '../../db/index';

const deleteUser: HandlerDeleteUserType = async (req, res, next) => {
  try {
    const id = +req.params.userId;
    const user = req.user.id;

    if (id !== user) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        errorsMessages.DELETE_ONLY_YORSELF,
      );
    }

    const userToRemove = await db.user.findOneBy({ id: req.user.id });

    await db.user.remove(userToRemove);

    res.status(StatusCodes.ACCEPTED).json({ succsess: succsessMessages.USER_DELETED });
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
