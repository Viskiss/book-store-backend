import express from 'express';
import dataSource from '../db/dataSource';
import User from '../db/entities/User';

const router = express.Router();

router.delete('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      throw Error('How to delete todo without id?');
    }
    const userRepository = dataSource.getRepository(User);
    const userToRemove = await userRepository.findOneBy({
      id: req.params.id,
    });
    await userRepository.remove(userToRemove);

    if (!userToRemove) {
      return res.status(404).json({ message: 'Unable to delete' });
    }

    res.json('ok');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
