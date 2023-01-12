import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from 'typeorm';

import { addUrl } from '../../utils/setUrlAvatar';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'date', nullable: true })
  dob: Date | string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @AfterLoad()
  setUrlAvatar(): void {
    this.avatar = addUrl(this.avatar);
  }
}

export default User;
