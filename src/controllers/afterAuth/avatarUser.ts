import { StatusCodes } from 'http-status-codes';
import * as fs from 'node:fs/promises';
import * as uuid from 'uuid';

import type { HandlerCurrentUserType } from 'src/types/authTypes/currentUserTypes';

import CustomError from '../../utils/customErrors/customErrors';
import errorsMessages from '../../utils/customErrors/errors';
import db from '../../db';
import config from '../../config';

const avatarUser: HandlerCurrentUserType = async (req, res, next) => {
  try {
    const id = +req.user.id;
    const User = await db.user.findOneBy({ id });

    const filedata = req.body.avatar;

    const avatarData = filedata.split('base64,')[1];
    const avatarType = filedata.split(';')[0].split('/')[1].replace(/svg\+xml/, 'svg');
    const randomName = uuid.v4();
    const avatarName = `${randomName}.${avatarType}`;
    const route = `public/avatars/${avatarName}`;

    if (User.avatar) {
      const oldName = User.avatar;
      fs.unlink(`public/avatars/${oldName}`);
    }
    fs.writeFile(route, avatarData, { encoding: 'base64' });

    User.avatar = avatarName;

    if (!filedata) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        errorsMessages.AVATAR_NOT_FOUND,
      );
    } else {
      await db.user.save(User);
      User.avatar = `${config.server.currentUrl}/avatars/${avatarName}`;
      res.status(StatusCodes.OK).json({ user: User });
    }
  } catch (error) {
    next(error);
  }
};

export default avatarUser;
