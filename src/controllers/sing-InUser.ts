import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import hashPassword from '../utils/hashPassword';
import createToken from '../utils/jwt.token';
import userDb from '../db/index';

const singIn: Handler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userDb.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!existingUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable find user' });
    }

    const matchPassword = await hashPassword.match(password, existingUser.password);

    if (matchPassword === false) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'Invalid credentials' });
    }

    const token = createToken.getToken(existingUser.id);

    const userData = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      dob: existingUser.dob,
    };

    res.status(StatusCodes.CREATED).json({ user: userData, token });
  } catch (error) {
    res
      .status(StatusCodes.NOT_IMPLEMENTED)
      .json('Error, unable to sing in');
  }
};

export default singIn;
