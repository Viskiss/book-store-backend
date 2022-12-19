import {
  StatusCodes,
} from 'http-status-codes';
import type { HandlerSingUpType } from 'src/utils/types/loginTypes/singUpTypes';
import { findDubleEmail } from '../../utils/findDuble';
import User from '../../db/entities/User';
import db from '../../db/index';
import hashPassword from '../../utils/hashPassword';
import tokenJwt from '../../utils/jwt.token';

const singUp: HandlerSingUpType = async (req, res, next) => {
  try {
    const { email, fullName, dob, password } = req.body;

    const user = new User();
    const emailUser = await findDubleEmail(email);

    user.fullName = fullName.trim();
    user.email = emailUser.trim().toLowerCase();

    user.password = await hashPassword.hash(password);
    user.dob = new Date(dob);

    const token = tokenJwt.createToken(user.id);

    await db.user.save(user);

    delete user.password;
    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export default singUp;
