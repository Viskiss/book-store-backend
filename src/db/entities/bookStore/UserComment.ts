import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Book } from './Book';
import { User } from '../User';

@Entity()
class UserComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Column({ type: 'varchar', nullable: false })
  bookId: number;

  @Column({ type: 'varchar', nullable: false })
  userId: number;

  @CreateDateColumn()
  createdTime: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}

export default UserComment;
