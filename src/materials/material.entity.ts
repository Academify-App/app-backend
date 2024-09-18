import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column('decimal', { precision: 5, scale: 2 })
  ratings: number;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column('text', { array: true })
  reviews: string[];

  @Column()
  numberOfPages: number;

  @Column()
  department: string;

  @Column()
  level: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  url: string;
}
