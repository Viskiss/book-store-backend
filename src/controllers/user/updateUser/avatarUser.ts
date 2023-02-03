import { StatusCodes } from 'http-status-codes';
import * as fs from 'node:fs/promises';
import * as uuid from 'uuid';

import type { HandlerCurrentUserType } from 'src/types';

import CustomError from '../../../utils/customErrors/customErrors';
import errorsMessages from '../../../utils/customErrors/errors';

import db from '../../../db';

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

    if (User.avatar !== null && 'null') {
      const oldName = User.avatar;
      fs.unlink(`public/avatars/${oldName.slice(30)}`);
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
      const newUser = await db.user.createQueryBuilder('user').where('user.id = :id', { id: User.id })
        .getOne();
      res.status(StatusCodes.OK).json({ user: newUser });
    }
  } catch (error) {
    next(error);
  }
};

export default avatarUser;
