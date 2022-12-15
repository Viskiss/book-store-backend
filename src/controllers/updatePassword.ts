import type { Handler } from 'express';
import bcrypt from 'bcrypt';
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
import userDb from '../db/index';
import hashPassword from '../utils/hashPassword';

const updatePassword: Handler = async (req, res) => {
  try {
    const password = req.body.password;
    const id = req.user;
    if (!password) {
      return res.status(404).json({ message: 'Need pass' });
    }

    const existingUser = await userDb.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      const newPassword = hashPassword.hash(password);
      existingUser.password = (await newPassword).toString();
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Need new password' });
    }

    await userDb.repository.save(existingUser);

    if (!existingUser) {
      return res.json({ message: 'Unable to update' });
    }

    res.status(StatusCodes.OK).json({ message: 'Password changed' });
  } catch (error) {
    res
      .status(StatusCodes.NOT_IMPLEMENTED)
      .send(ReasonPhrases.NOT_IMPLEMENTED);
  }
};

export default updatePassword;
