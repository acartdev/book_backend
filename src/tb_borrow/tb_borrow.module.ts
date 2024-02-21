import { Module } from '@nestjs/common';
import { TbBorrowService } from './tb_borrow.service';
import { TbBorrowController } from './tb_borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbBorrow } from './entities/tb_borrow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TbBorrow])],
  controllers: [TbBorrowController],
  providers: [TbBorrowService],
})
export class TbBorrowModule {}
