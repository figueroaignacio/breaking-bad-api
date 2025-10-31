// Entities
import { Death } from 'src/deaths/entities/death.entity';
import { Quote } from 'src/quotes/entities/quote.entity';

// ORM Decorators
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CharacterStatus {
  ALIVE = 'alive',
  DECEASED = 'deceased',
  UNKNOWN = 'unknown',
}

export enum CharacterCategory {
  BREAKING_BAD = 'breaking_bad',
  BETTER_CALL_SAUL = 'better_call_saul',
  EL_CAMINO = 'el_camino',
  ALL = 'all',
}

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nickname: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  birthday: string;

  @Column({ type: 'simple-array', nullable: true })
  occupation: string[];

  @Column({ type: 'varchar', length: 500, nullable: true })
  img: string;

  @Column({
    type: 'enum',
    enum: CharacterStatus,
    default: CharacterStatus.UNKNOWN,
  })
  status: CharacterStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  portrayed: string;

  @Column({
    type: 'enum',
    enum: CharacterCategory,
    default: CharacterCategory.BREAKING_BAD,
  })
  category: CharacterCategory;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Quote, (quote) => quote.character)
  quotes: Quote[];

  @OneToMany(() => Death, (death) => death.victim)
  deathsAsVictim: Death[];

  @OneToMany(() => Death, (death) => death.killer)
  deathsAsKiller: Death[];
}
