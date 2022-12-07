import type { Handler } from 'express';
import bcrypt from 'bcrypt';

import dataSource from '../db/dataSource';
import User from '../db/entities/User';
import Token from '../utils/jwt.utils';
import config from '../config';

const updatePassword: Handler = async (req, res) => {
  try {
    if (!req.body.password) {
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
    const token = Token.getTokens(req.params.id);

    const matchPassword = await bcrypt.compare(req.body.password, userToUpdate.password);

    if (Token.parseJwt(tokenUser).id !== +Token.parseJwt(token.accessToken).id) {
      return res.status(404).json({ message: 'Update only yourself' });
    }
    if (Token.parseJwt(tokenUser).id === +Token.parseJwt(token.accessToken).id) {
      if (!matchPassword) {
        const password = await bcrypt.hash(req.body.password, +config.passwordSalt);
        userToUpdate.password = password;
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
