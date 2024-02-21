import { PartialType } from '@nestjs/mapped-types';
import { CreateTbBookDto } from './create-tb_book.dto';

export class UpdateTbBookDto extends PartialType(CreateTbBookDto) {}
