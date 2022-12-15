import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import userDb from '../db/index';
import hashPassword from '../utils/hashPassword';
import createToken from '../utils/jwt.token';

const singUp: Handler = async (req, res, next) => {
  try {
    const { email, fullName, dob, password } = req.body;

    const user = new userDb.User();

    user.fullName = fullName?.replace(/\s+/g, ' ').trim();
    user.email = email.trim().toLowerCase();
    user.password = await hashPassword.hash(password);
    user.dob = new Date(dob);

    const token = createToken.getToken(user.id);

    await userDb.repository.save(user);

    const userData =
    {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      dob: user.dob,
    };

    res.status(StatusCodes.CREATED).json({ userData, token });
  } catch (error) {
    next(error);
  }
};

export default singUp;
