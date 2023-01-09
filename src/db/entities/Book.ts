import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  author: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  price: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  genre: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  text: string;

  @Column({ type: 'varchar', nullable: true })
  rate: string;

  @Column({ type: 'varchar', nullable: false })
  img: string;
}

export default Book;
