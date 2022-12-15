import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import userDb from '../db/index';

const getUser: Handler = async (req, res) => {
  try {
    const allUsers = await userDb.repository.find();
    res.status(StatusCodes.OK).json(allUsers);
  } catch (error) {
    res.status(StatusCodes.NOT_IMPLEMENTED).json('Error, unable to get users');
  }
};

export default getUser;
