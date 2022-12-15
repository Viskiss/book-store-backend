import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import token from '../utils/jwt.token';
import userDb from '../db/index';

const updateUser: Handler = async (req, res) => {
  try {
    const { email, fullName, dob } = req.body;
    const id = +req.params.userId;

    const userToUpdate = await userDb.repository.findOneBy({ id });

    if (token.matchJwtId(req.user, id)) {
      userToUpdate.fullName = fullName || userToUpdate.fullName;
      userToUpdate.email = email || userToUpdate.email;
      userToUpdate.dob = dob || userToUpdate.dob;

      await userDb.repository.save(userToUpdate);
    }
    if (!userToUpdate) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to update, user not found' });
    }

    res.json(userToUpdate);
  } catch (error) {
    res.status(StatusCodes.NOT_IMPLEMENTED).json('Error, unable update current user');
  }
};

export default updateUser;
