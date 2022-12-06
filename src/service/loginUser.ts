import type { Handler } from 'express';
import dataSource from 'src/db/dataSource';
import User from 'src/db/entities/User';

const loginUserService: Handler = async (req) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email: req.body.email });
  if (!user) {
    throw Error('id?');
  }
};

export default loginUserService;
