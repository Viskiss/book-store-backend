import User from '../db/entities/User';
import dataSource from '../db/dataSource';
import Book from './entities/bookStore/Book';
import Genre from './entities/bookStore/Genre';
import Cart from './entities/bookStore/Cart';
import UserComment from './entities/bookStore/UserComment';

export default {
  user: dataSource.getRepository(User),
  cart: dataSource.getRepository(Cart),
  book: dataSource.getRepository(Book),
  genre: dataSource.getRepository(Genre),
  comment: dataSource.getRepository(UserComment),
};
