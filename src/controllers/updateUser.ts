import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import errorsMessages from '../utils/customErrors/errors';
import db from '../db/index';
import CustomError from '../utils/customErrors/customErrors';

const updateUser: Handler = async (req, res, next) => {
  try {
    const { email, fullName, dob } = req.body;
    const id = +req.params.userId;

    const userToUpdate = await db.user.findOneBy({ id: req.user.id });

    if (!userToUpdate) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.ID_NOT_FOUND,
      );
    }

    if (id === req.user.id) {
      userToUpdate.fullName = fullName || userToUpdate.fullName;
      userToUpdate.email = email || userToUpdate.email;
      userToUpdate.dob = dob || userToUpdate.dob;

      await db.user.save(userToUpdate);
    }

    res.json(userToUpdate);
  } catch (error) {
    next(error);
  }
};

export default updateUser;
