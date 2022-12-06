import type { Handler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dataSource from '../db/dataSource';
import User from '../db/entities/User';

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
    const Token = jwt.sign(req.body.email, process.env.TOKEN_SECRET);
    const user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password, 10);
    user.dob = req.body.dob;
    user.token = Token;
    await userRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const singIn: Handler = async (req, res) => {
  try {
    const userRepository = dataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({
      email: req.params.email,
    });
    if (!existingUser) {
      return res.status(404).json({ message: 'Unable find user' });
    }
    const matchPassword = await bcrypt.compare(req.body.password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const Token = jwt.sign(existingUser.email, process.env.TOKEN_SECRET);

    res.status(201).json({ user: existingUser, token: Token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { singUp, singIn };
