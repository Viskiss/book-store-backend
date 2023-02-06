import {
  StatusCodes,
} from 'http-status-codes';

import type { HandlerSignUpType } from 'src/types/userTypes';
import { findDubleEmail } from '../../../utils/findDuble';
import hashPassword from '../../../utils/hashPassword';
import tokenJwt from '../../../utils/jwtToken';

import User from '../../../db/entities/User';

import db from '../../../db';

const singUp: HandlerSignUpType = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = new User();
    const emailUser = await findDubleEmail(email);

    user.email = emailUser.trim().toLowerCase();

    user.password = await hashPassword.hash(password);

    const token = tokenJwt.createToken(user.id);

    await db.user.save(user);

    delete user.password;
    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export default singUp;
