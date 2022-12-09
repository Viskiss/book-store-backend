import type { Handler } from 'express';
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
import userDb from '../db/index';

const getUser: Handler = async (req, res) => {
  try {
    const allUsers = await userDb.repository.find();
    res.status(StatusCodes.OK).json(allUsers);
  } catch (error) {
    res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
  }
};

export default getUser;
