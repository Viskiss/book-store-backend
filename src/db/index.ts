import User from '../db/entities/User';
import dataSource from '../db/dataSource';

const repository = dataSource.getRepository(User);

export default { User, repository };
