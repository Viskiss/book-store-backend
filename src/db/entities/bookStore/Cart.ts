import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Book } from './Book';
import { User } from '../User';

@Entity()
class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  bookId: number;

  @Column({ type: 'varchar', nullable: false })
  userId: number;

  @Column({ type: 'numeric', nullable: false })
  price: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ type: 'varchar', nullable: false })
  cover: string;

  @Column({ type: 'varchar', nullable: false, default: 1 })
  quantityOfGoods: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}

export default Cart;
