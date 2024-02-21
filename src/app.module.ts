import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbMemberModule } from './tb_member/tb_member.module';
import { TbBookModule } from './tb_book/tb_book.module';
import { TbBorrowModule } from './tb_borrow/tb_borrow.module';
import { TbBook } from './tb_book/entities/tb_book.entity';
import { TbMember } from './tb_member/entities/tb_member.entity';
import { TbBorrow } from './tb_borrow/entities/tb_borrow.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'standart',
      entities: [TbBook, TbMember, TbBorrow],
      synchronize: true,
    }),
    TbMemberModule,
    TbBookModule,
    TbBorrowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
