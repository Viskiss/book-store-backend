import type { Handler } from 'express';

import dataSource from '../db/dataSource';
import User from '../db/entities/User';
import Token from '../utils/jwt.utils';

const deleteUser: Handler = async (req, res) => {
  try {
    if (!req.params.id) {
      throw Error('How to delete todo without id?');
    }

    const userRepository = dataSource.getRepository(User);
    const userToRemove = await userRepository.findOneBy({
      id: req.params.id,
    });

    const tokenUser = req.header('Authorization')?.replace('Bearer ', '');
    const token = Token.getTokens(req.params.id);

    if (Token.parseJwt(tokenUser).id !== +Token.parseJwt(token.accessToken).id) {
      return res.status(404).json({ message: 'Delete only yourself' });
    }
    if (Token.parseJwt(tokenUser).id === +Token.parseJwt(token.accessToken).id) {
      await userRepository.remove(userToRemove);
    }

    if (!userToRemove) {
      return res.status(404).json({ message: 'Unable to delete' });
    }

    res.json('User deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default deleteUser;
