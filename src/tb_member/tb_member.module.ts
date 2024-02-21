import { Module } from '@nestjs/common';
import { TbMemberService } from './tb_member.service';
import { TbMemberController } from './tb_member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbMember } from './entities/tb_member.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TbMember])],
  controllers: [TbMemberController],
  providers: [TbMemberService],
})
export class TbMemberModule {}
