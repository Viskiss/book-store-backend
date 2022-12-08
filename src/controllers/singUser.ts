import type { Handler } from 'express';
import bcrypt from 'bcrypt';
import repo from '../db/index';
import dataSource from '../db/dataSource';
import User from '../db/entities/User';
import config from '../config';
import createToken from '../utils/jwt.token';

const singUp: Handler = async (req, res) => {
  try {
    const { email } = req.body;

    const userRepository = repo.repository;
    const existingUser = await userRepository.findOne(email);

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email is registered' });
    }

    const token = createToken.getToken(req.body.id);
    const user = new User();

    user.fullName = req.body.fullName.replace(/\s+/g, ' ').trim();
    user.email = email.trim().toLowerCase();
    user.password = await bcrypt.hash(req.body.password, +config.passwordSalt);
    user.dob = new Date(req.body.dob);

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

    // const user = await userRepository
    //   .createQueryBuilder('user')
    //   .addSelect('password')
    //   .where('user.email = :email', { email: req.body.email })
    //   .getOne();

    if (!existingUser) {
      return res.status(404).json({ message: 'Unable find user' });
    }

    const matchPassword = await bcrypt.compare(req.body.password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createToken.getToken(existingUser.id);

    const userData = {
      dob: existingUser.dob,
      email: existingUser.email,
      fullName: existingUser.fullName,
      id: existingUser.id,
    };
    // delete user.password;

    res.status(201).json({ user: userData, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { singUp, singIn };
