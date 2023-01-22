import Book from '../db/entities/bookStore/Book';
import db from '../db/index';
import books from './books';

const bookUp = async () => {
  // eslint-disable-next-line no-console
  console.log(books.length);
  try {
    books.forEach(async (el) => {
      const book = new Book();
      book.title = el.title;
      book.author = el.author;
      book.price = el.price;
      book.text = el.text;
      book.rate = el.rate;
      book.cover = '01';
      book.date = el.date;
      book.status = el.status;
      book.genre = el.genre;
      await db.book.save(book);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default bookUp;
