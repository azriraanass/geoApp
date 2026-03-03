import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ name: 'firstName' })
  firstName: string;
  @Column({ name: 'lastName' })
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  phoneNumber: string;
  @Column({ name: 'password' })
  password: string;
  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  createAt: Date;
  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt: Date;
  @BeforeInsert()
  async cryptPassword(): Promise<void> {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
