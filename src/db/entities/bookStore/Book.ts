import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { addUrlBook } from '../../../utils/setUrl';
import Genre from './Genre';
import UserComment from './UserComment';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ type: 'numeric', nullable: false })
  price: string;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Column({ type: 'varchar', nullable: true })
  rate: string;

  @Column({ type: 'varchar', nullable: false })
  cover: string;

  @Column({ type: 'date', nullable: false })
  date: string;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @AfterLoad()
  setUrlAvatar(): void {
    this.cover = addUrlBook(this.cover);
  }

  @ManyToMany(() => Genre, (genre) => genre.name)
  @JoinTable()
  genre: Genre[];

  @OneToMany(() => UserComment, (comment) => comment.book)
  comments: UserComment[];
}

export default Book;
