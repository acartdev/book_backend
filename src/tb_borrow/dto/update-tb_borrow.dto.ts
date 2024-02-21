import { PartialType } from '@nestjs/mapped-types';
import { CreateTbBorrowDto } from './create-tb_borrow.dto';

export class UpdateTbBorrowDto extends PartialType(CreateTbBorrowDto) {}
