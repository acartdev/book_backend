import { TbBorrow } from 'src/tb_borrow/entities/tb_borrow.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TbBook {
  @PrimaryColumn({ length: 6, unique: true })
  b_id: string;

  @Column({ length: 60 })
  b_name: string;

  @Column({ type: 'int' })
  b_category: number;

  @Column({ length: 50 })
  b_writer: string;

  @Column()
  b_price: number;
}
