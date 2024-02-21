import { Module } from '@nestjs/common';
import { TbBookService } from './tb_book.service';
import { TbBookController } from './tb_book.controller';
import { TbBook } from './entities/tb_book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TbBook])],
  controllers: [TbBookController],
  providers: [TbBookService],
})
export class TbBookModule {}
