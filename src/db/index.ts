import User from '../db/entities/User';
import dataSource from '../db/dataSource';
import Book from './entities/Book';

export default {
  user: dataSource.getRepository(User),
  book: dataSource.getRepository(Book),
};
