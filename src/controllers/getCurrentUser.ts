import type { Handler } from 'express';
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';

import userDb from '../db/index';

const getCurrentUser: Handler = async (req, res) => {
  try {
    const userId = req.user;

    if (userId) {
      const currentUser = await userDb.repository.findOneBy({ id: userId });

      res.status(StatusCodes.OK).json(currentUser);
    }
  } catch (error) {
    res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
  }
};

export default getCurrentUser;
