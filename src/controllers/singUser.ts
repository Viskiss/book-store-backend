import type { Handler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dataSource from '../db/dataSource';
import User from '../db/entities/User';
import config from '../config';

const singUp: Handler = async (req, res) => {
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
    const token = jwt.sign({ id: req.body.id }, config.jwtSecret);
    const user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password, config.passwordSalt);
    user.dob = req.body.dob;
    await userRepository.save(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const singIn: Handler = async (req, res) => {
  try {
    const userRepository = dataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      select: ['dob', 'email', 'fullName', 'id', 'password'],
      where: {
        email: req.params.email,
      },
    });
    if (!existingUser) {
      return res.status(404).json({ message: 'Unable find user' });
    }
    const matchPassword = await bcrypt.compare(req.body.password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({
      id: existingUser.id,
    }, config.jwtSecret);

    const userData: Omit<User, 'password'> = {
      dob: existingUser.dob,
      email: existingUser.email,
      fullName: existingUser.fullName,
      id: existingUser.id,
    };

    res.status(201).json({ user: userData, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { singUp, singIn };
