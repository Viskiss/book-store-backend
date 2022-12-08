import type { Handler } from 'express';
import bcrypt from 'bcrypt';

import dataSource from '../db/dataSource';
import User from '../db/entities/User';
import Token from '../utils/jwt.token';
import config from '../config';

const updatePassword: Handler = async (req, res) => {
  try {
    const password = req.body.password;
    if (!password) {
      return res.status(404).json({ message: 'Need pass' });
    }
    const userRepository = dataSource.getRepository(User);

    const userToUpdate = await userRepository.findOne({
      select: ['dob', 'email', 'fullName', 'id', 'password'],
      where: {
        id: req.body.id,
      },
    });

    const tokenUser = req.header('Authorization')?.replace('Bearer ', '');
    const token = Token.getToken(+req.params.id);

    const matchPassword = await bcrypt.compare(password, userToUpdate.password);

    if (Token.parseJwt(tokenUser).id !== +Token.parseJwt(token.accessToken).id) {
      return res.status(404).json({ message: 'Update only yourself' });
    }
    if (Token.parseJwt(tokenUser).id === +Token.parseJwt(token.accessToken).id) {
      if (!matchPassword) {
        const newPassword = await bcrypt.hash(password, +config.passwordSalt);
        userToUpdate.password = newPassword;
      } else {
        return res.status(404).json({ message: 'Need new password' });
      }
    }

    userToUpdate.fullName = req.body.fullName;

    await userRepository.save(userToUpdate);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'Unable to update' });
    }

    res.json(userToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default updatePassword;
