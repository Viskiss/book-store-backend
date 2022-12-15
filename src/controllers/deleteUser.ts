import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import CustomError from '../utils/customErrors/customErrors';
import errorsMessages from '../utils/customErrors/errors';
import succsessMessages from '../utils/customErrors/success';
import userDb from '../db/index';
import token from '../utils/jwt.token';

const deleteUser: Handler = async (req, res, next) => {
  try {
    const id = +req.params.userId;
    const userId = req.user;

    if (!id) {
      throw new CustomError(
        StatusCodes.FORBIDDEN,
        errorsMessages.ID_NOT_FOUND,
      );
    }

    if (id === userId) {
      const userToRemove = await userDb.repository.findOneBy({ id });

      if (token.matchJwtId(req.user, id)) { await userDb.repository.remove(userToRemove); }

      if (!userToRemove) {
        throw new CustomError(
          StatusCodes.NOT_IMPLEMENTED,
          errorsMessages.UNABLE_TO_DELETE,
        );
      }

      res.status(StatusCodes.ACCEPTED).json(succsessMessages.USER_DELETED);
    } else {
      throw new CustomError(
        StatusCodes.METHOD_NOT_ALLOWED,
        errorsMessages.DELETE_ONLY_YORSELF,
      );
    }
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
