import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  lastUpdatedAt: Date;
}

// tslint:disable-next-line: max-classes-per-file
@Entity()
export class DescriptorEntity {
  @Column()
  title: string;

  @Column()
  description: string;
}