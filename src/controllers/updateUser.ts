import type { Handler } from 'express';

import dataSource from '../db/dataSource';
import User from '../db/entities/User';
import Token from '../utils/jwt.token';

const updateUser: Handler = async (req, res) => {
  try {
    const id = +req.params.id;
    const fullName = req.body.fullName;

    const userRepository = dataSource.getRepository(User);
    const userToUpdate = await userRepository.findOneBy({ id });

    const tokenUser = req.header('Authorization')?.replace('Bearer ', '');
    const token = Token.getToken(+id);

    if (Token.parseJwt(tokenUser).id !== +Token.parseJwt(token.accessToken).id) {
      return res.status(404).json({ message: 'Update only yourself' });
    }
    if (Token.parseJwt(tokenUser).id === +Token.parseJwt(token.accessToken).id) {
      if (fullName) {
        userToUpdate.fullName = fullName;
      }
      if (req.body.email) {
        userToUpdate.email = req.body.email;
      }
      if (req.body.dob) {
        userToUpdate.dob = req.body.dob;
      }
    }
    await userRepository.save(userToUpdate);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'Unable to update' });
    }

    res.json(userToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default updateUser;
