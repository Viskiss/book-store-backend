import type { Handler } from 'express';

import User from '../db/index';
import Token from '../utils/jwt.token';

const deleteUser: Handler = async (req, res) => {
  try {
    const id = +req.params.id;
    if (!id) {
      throw Error('How to delete todo without id?');
    }

    const userRepository = User.repository;
    const userToRemove = await userRepository.findOneBy({ id });

    const tokenUser = req.header('Authorization')?.replace('Bearer ', '');
    const token = Token.getToken(id);

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
