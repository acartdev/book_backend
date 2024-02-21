import { TbBook } from 'src/tb_book/entities/tb_book.entity';
import { TbMember } from 'src/tb_member/entities/tb_member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class TbBorrow {
  @PrimaryGeneratedColumn()
  br_id: number;

  @Column({ default: null, nullable: true, type: 'date' })
  br_date_br: Date;

  @Column({ default: null, nullable: true, type: 'date' })
  br_date_rt: Date;

  @ManyToOne(() => TbBook, (b_id) => b_id.b_id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'b_id' })
  b_id: string;

  @ManyToOne(() => TbMember, (m_user) => m_user.m_user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'm_user' })
  m_user: string;

  @Column({ nullable: true, default: 0 })
  b_fine: number;
}
