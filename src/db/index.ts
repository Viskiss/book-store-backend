import User from '../db/entities/User';
import dataSource from '../db/dataSource';
import Book from './entities/book/Book';
import Genre from './entities/book/Genre';

export default {
  user: dataSource.getRepository(User),
  book: dataSource.getRepository(Book),
  genre: dataSource.getRepository(Genre),
};
