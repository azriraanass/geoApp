import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';

@Entity({ name: 'blacklist' })
export class BlackList {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  token: string;
  @CreateDateColumn({ nullable: false, type: 'timestamptz' })
  expiredAt: Date;
}
