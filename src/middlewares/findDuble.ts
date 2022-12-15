import type { Handler } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import repo from '../db/index';

export const findDuble: Handler = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await repo.repository.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email is registered' });
    }
    return next();
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ message: 'Error, duplicate email check failed' });
  }
};
