import type { Handler } from 'express';
import bcrypt from 'bcrypt';

import dataSource from '../db/dataSource';
import User from '../db/entities/User';
import config from '../config';
import createToken from '../utils/jwt.utils';

const singUp: Handler = async (req, res) => {
  try {
    if (!req.body) {
      throw Error('What should i do with it?');
    }
    const userRepository = dataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      select: ['dob', 'email', 'fullName', 'id', 'password'],
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res.status(404).json({ message: 'User with this email is registered' });
    }

    const token = createToken.getTokens(req.body.id);
    const user = new User();

    user.fullName = req.body.fullName.replace(/\s+/g, ' ').trim();
    user.email = req.body.email.replace(/\s+/g, ' ').trim();
    user.password = await bcrypt.hash(req.body.password, +config.passwordSalt);
    user.dob = req.body.dob.replace(/\s+/g, ' ').trim();

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
        email: req.body.email,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: 'Unable find user' });
    }

    const matchPassword = await bcrypt.compare(req.body.password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createToken.getTokens(existingUser.id);

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
