import Cart from 'src/db/entities/bookStore/Cart';
import type { HandlerAddBookType } from 'src/types/cart/addBookTypes';
import db from '../../db/index';

export const addBook:HandlerAddBookType = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const book = await db.book.findOneBy({ id: bookId });
    const user = await db.user.findOneBy({ id: userId });

    const cart = new Cart();
    cart.book = book;
    cart.user = user;
    cart.bookCover = book.cover;
    cart.price = book.price;

    await db.cart.save(cart);

    return res.json({ book });
  } catch (err) {
    next(err);
  }
};
