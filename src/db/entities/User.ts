import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: number;

  @Column()
  dob: number;
}

export default User;
