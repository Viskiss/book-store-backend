import express from 'express';
import dataSource from '../db/dataSource';
import User from '../db/entities/User';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userRepository = dataSource.getRepository(User);
    const allUsers = await userRepository.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
