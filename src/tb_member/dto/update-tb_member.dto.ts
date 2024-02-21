import { PartialType } from '@nestjs/mapped-types';
import { CreateTbMemberDto } from './create-tb_member.dto';

export class UpdateTbMemberDto extends PartialType(CreateTbMemberDto) {}
