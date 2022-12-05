import express from 'express';
import dataSource from '../db/dataSource';
import User from '../db/entities/User';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.title) {
      throw Error('Title is required');
    }
    const userRepository = dataSource.getRepository(User);

    const user = new User();
    user.fullName = '';
    user.email = '';
    user.dob = 25;
    await userRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
