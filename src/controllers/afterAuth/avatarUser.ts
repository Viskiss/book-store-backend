import {
  StatusCodes,
} from 'http-status-codes';

import type { HandlerCurrentUserType } from 'src/types/authTypes/currentUserTypes';
import CustomError from '../../utils/customErrors/customErrors';
import errorsMessages from '../../utils/customErrors/errors';
import db from '../../db';
import config from '../../config';

const avatarUser: HandlerCurrentUserType = async (req, res, next) => {
  try {
    const id = +req.user.id;

    const filedata = req.file;

    const userToUploadAvatar = await db.user.findOneBy({ id });

    userToUploadAvatar.avatar = `${config.server.currentUrl}/static/avatars/${filedata.filename}`;
    if (!filedata) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.AVATAR_NOT_FOUND,
      );
    } else {
      await db.user.save(userToUploadAvatar);
      res.status(StatusCodes.OK).json({ user: userToUploadAvatar });
    }
  } catch (error) {
    next(error);
  }
};

export default avatarUser;
