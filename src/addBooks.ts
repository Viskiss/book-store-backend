import Book from './db/entities/Book';
import db from './db/index';

const singUp = async () => {
  try {
    const book = new Book();
    book.author = '';
    book.genre = '';
    book.img = '';
    book.price = '';
    book.rate = '';
    book.text = '';
    book.title = '';
    await db.user.save(book);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default singUp;
