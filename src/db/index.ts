import User from '../db/entities/User';
import dataSource from '../db/dataSource';
import Book from './entities/bookStore/Book';
import Genre from './entities/bookStore/Genre';
import Cart from './entities/bookStore/Cart';
import UserComment from './entities/bookStore/UserComment';
import LikedBook from './entities/bookStore/LikedBook';
import BookRate from './entities/bookStore/BookRate';

export default {
  user: dataSource.getRepository(User),
  cart: dataSource.getRepository(Cart),
  book: dataSource.getRepository(Book),
  genre: dataSource.getRepository(Genre),
  comment: dataSource.getRepository(UserComment),
  likedBook: dataSource.getRepository(LikedBook),
  bookRate: dataSource.getRepository(BookRate),
};
