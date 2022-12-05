import express from 'express';
import dataSource from '../db/dataSource';
import User from '../db/entities/User';

const router = express.Router();

router.patch('/:id', async (req, res) => {
  try {
    if (!req.body.title) {
      throw Error('Do you want to deceive me? Something is missing.');
    }
    const userRepository = dataSource.getRepository(User);
    const userToUpdate = await userRepository.findOneBy({
      id: req.params.id,
    });
    userToUpdate.email = '';
    await userRepository.save(userToUpdate);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'Unable to update' });
    }

    res.json(userToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
