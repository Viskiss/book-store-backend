import type { Handler } from 'express';
import validator from 'validator';
import dataSource from '../db/dataSource';
import User from '../db/entities/User';

const registrationUser: Handler = async (req, res) => {
  try {
    if (!req.body) {
      throw Error('What should i do with it?');
    }
    if (
      !req.body.fullName &&
      !req.body.email &&
      !req.body.password &&
      !req.body.dob) {
      throw Error('All is required');
    }
    const userRepository = dataSource.getRepository(User);

    const user = new User();
    if (validator.isLength(req.body.fullName, { min: 6, max: 25 })) {
      user.fullName = req.body.fullName;
    }
    if (validator.isEmail(req.body.email)) {
      user.email = req.body.email;
    }
    if (validator.isLength(req.body.password, { min: 4, max: 10 })) {
      user.password = req.body.password;
    }
    user.dob = req.body.dob;
    await userRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default registrationUser;
