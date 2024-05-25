import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: string;

  @Column()
  birthDate: Date;

  @Column()
  country: string;

  @Column()
  status: string;
}