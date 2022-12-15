import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import User from '../db/entities/User';
import db from '../db/index';
import hashPassword from '../utils/hashPassword';
import token from '../utils/jwt.token';

const singUp: Handler = async (req, res, next) => {
  try {
    const { email, fullName, dob, password } = req.body;

    const user = new User();

    user.fullName = fullName?.replace(/\s+/g, ' ').trim();
    user.email = email.trim().toLowerCase();
    user.password = await hashPassword.hash(password);
    user.dob = new Date(dob);

    const tokenJwt = token.createToken(user.id);

    await db.user.save(user);

    delete user.password;
    res.status(StatusCodes.CREATED).json({ user, tokenJwt });
  } catch (error) {
    next(error);
  }
};

export default singUp;
