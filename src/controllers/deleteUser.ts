import type { Handler } from 'express';
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
import userDb from '../db/index';
import token from '../utils/jwt.token';

const deleteUser: Handler = async (req, res) => {
  try {
    const id = +req.params.userId;
    const userId = req.user;

    if (id === userId) {
      const userToRemove = await userDb.repository.findOneBy({ id });

      if (token.matchJwtId(req.user, id)) { await userDb.repository.remove(userToRemove); }

      if (!userToRemove) {
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({ message: 'Unable to delete' });
      }

      res.status(StatusCodes.ACCEPTED).json('User deleted');
    } else {
      res.status(StatusCodes.METHOD_NOT_ALLOWED).json('Delete only yourself');
    }
  } catch (error) {
    res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
  }
};

export default deleteUser;
