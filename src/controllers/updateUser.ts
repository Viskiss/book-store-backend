import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import errorsMessages from '../utils/customErrors/errors';
import token from '../utils/jwt.token';
import userDb from '../db/index';
import CustomError from '../utils/customErrors/customErrors';

const updateUser: Handler = async (req, res, next) => {
  try {
    const { email, fullName, dob } = req.body;
    const id = +req.params.userId;

    const userToUpdate = await userDb.repository.findOneBy({ id });

    if (token.matchJwtId(req.user, id)) {
      userToUpdate.fullName = fullName || userToUpdate.fullName;
      userToUpdate.email = email || userToUpdate.email;
      userToUpdate.dob = dob || userToUpdate.dob;

      await userDb.repository.save(userToUpdate);
    }
    if (!userToUpdate) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.ID_NOT_FOUND,
      );
    }

    res.json(userToUpdate);
  } catch (error) {
    next(error);
  }
};

export default updateUser;
