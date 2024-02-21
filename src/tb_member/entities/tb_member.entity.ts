import { TbBorrow } from 'src/tb_borrow/entities/tb_borrow.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';
enum Role {
  user = 'user',
  admin = 'admin',
  librarian = 'librarian',
}
@Entity()
export class TbMember {
  @PrimaryColumn({ length: 40, unique: true })
  m_user: string;

  @Column({ length: 50 })
  m_name: string;

  @Column({ length: 10 })
  m_phone: string;

  @Column({ length: 20 })
  m_pass: string;

  @Column({ enum: Role, type: 'enum', default: Role.user })
  m_role: Role;
}
