import type { Handler } from 'express';
import loginUserService from 'src/service/loginUser';
import dataSource from '../db/dataSource';
import User from '../db/entities/User';

const loginUser: Handler = async (req, res, next) => {
  try {
    const userData = loginUserService(req.body.email, req.body.password);
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};

export default loginUser;
