import { Entity, Column } from 'typeorm';
import { BaseEntity } from './SharedEntity';

@Entity()
export class ServiceEntity extends BaseEntity {
  @Column()
  name: string;
}