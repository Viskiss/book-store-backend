import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar' })
  dob: string;
}

export default User;
