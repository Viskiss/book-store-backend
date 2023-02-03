import { StatusCodes } from 'http-status-codes';

import type { HandlerUpdateUserType } from 'src/types';
import CustomError from '../../../utils/customErrors/customErrors';
import { findDubleEmail } from '../../../utils/findDuble';
import errorsMessages from '../../../utils/customErrors/errors';

import db from '../../../db/index';

const updateUser: HandlerUpdateUserType = async (req, res, next) => {
  try {
    const { email, fullName, dob } = req.body;
    const id = +req.params.userId;

    const userToUpdate = await db.user.findOneBy({ id });

    if (!userToUpdate) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.USER_NOT_FOUND,
      );
    }

    if (userToUpdate.email !== email) {
      const emailUser = await findDubleEmail(email);
      userToUpdate.email = emailUser || userToUpdate.email;
    }

    userToUpdate.fullName = fullName || userToUpdate.fullName;
    userToUpdate.dob = dob || userToUpdate.dob;

    await db.user.save(userToUpdate);
    res.status(StatusCodes.OK).json({ user: userToUpdate });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
