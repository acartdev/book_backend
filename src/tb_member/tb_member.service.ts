import { Injectable } from '@nestjs/common';
import { CreateTbMemberDto } from './dto/create-tb_member.dto';
import { UpdateTbMemberDto } from './dto/update-tb_member.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TbMember } from './entities/tb_member.entity';
enum Role {
  user = 'user',
  admin = 'admin',
  librarian = 'librarian',
}
@Injectable()
export class TbMemberService {
  constructor(
    @InjectRepository(TbMember)
    private memberRepository: Repository<TbMember>,
  ) {}
  create(createTbMemberDto: CreateTbMemberDto): Promise<TbMember> {
    return this.memberRepository.save(createTbMemberDto);
  }

  findAll(): Promise<TbMember[]> {
    return this.memberRepository.find({ where: { m_role: Role.user } });
  }
  findAdmin(): Promise<TbMember[]> {
    return this.memberRepository.find({ where: { m_role: Role.admin } });
  }

  findOne(m_user: string): Promise<TbMember | null> {
    return this.memberRepository.findOneBy({ m_user });
  }

  update(m_user: string, updateTbMemberDto: UpdateTbMemberDto) {
    return this.memberRepository.update(m_user, updateTbMemberDto);
  }
  async remove(m_user: string): Promise<void> {
    await this.memberRepository.delete({ m_user });
  }
}
