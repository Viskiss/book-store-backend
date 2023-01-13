import { Entity, PrimaryGeneratedColumn, Column, AfterLoad, ManyToMany, JoinTable } from 'typeorm';
import { addUrlBook } from '../../../utils/setUrl';
import Genre from './Genre';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ type: 'varchar', nullable: false })
  price: string;

  @Column({ type: 'varchar', nullable: false })
  text: string;

  @Column({ type: 'varchar', nullable: true })
  rate: string;

  @Column({ type: 'varchar', nullable: false })
  cover: string;

  @Column({ type: 'varchar', nullable: false })
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
}

export default Book;
