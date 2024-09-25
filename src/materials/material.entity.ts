import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

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

  @Column('text')
  url: string;

  @Column('text')
  cover_url: string;

  @Column('jsonb', { default: [] })
  reviews: { value: string; rating: number }[];
}
