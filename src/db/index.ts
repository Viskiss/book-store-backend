import User from '../db/entities/User';
import dataSource from '../db/dataSource';

export default {
  user: dataSource.getRepository(User),
};
