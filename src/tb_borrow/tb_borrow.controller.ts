import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TbBorrowService } from './tb_borrow.service';
import { CreateTbBorrowDto } from './dto/create-tb_borrow.dto';
import { UpdateTbBorrowDto } from './dto/update-tb_borrow.dto';

@Controller('borrows')
export class TbBorrowController {
  constructor(private readonly tbBorrowService: TbBorrowService) {}

  @Post()
  async create(@Body() createTbBorrowDto: CreateTbBorrowDto) {
    return await this.tbBorrowService
      .create(createTbBorrowDto)
      .then(async () => {
        return { status: 'Success', msg: 'เพิ่มข้อมูลการยืมสำเร็จ!!' };
      })
      .catch((e) => {
        return { status: 'Fail', msg: 'เพิ่มข้อมูลการยืมไม่สำเร็จ!!' };
      });
  }
  @Get()
  getBorrow() {
    return this.tbBorrowService.findBorrow();
  }

  @Get('hist')
  getHist() {
    return this.tbBorrowService.findHist();
  }

  @Get('hist/:id')
  getHistById(@Param('id') id: string) {
    return this.tbBorrowService.findHistByid(id);
  }

  @Get('member/:id')
  getBorrowMem(@Param('id') id: string) {
    return this.tbBorrowService.findByMem(id);
  }
  @Get(':id')
  getBorrowId(@Param('id') id: string) {
    return this.tbBorrowService.findOne(+id);
  }

  @Patch('borrow/:id')
  borrow(
    @Param('id') id: string,
    @Body() updateTbBorrowDto: UpdateTbBorrowDto,
  ) {
    return this.tbBorrowService.borrow(+id, updateTbBorrowDto);
  }

  @Patch('return/:id')
  rtBorrow(
    @Param('id') id: string,
    @Body() updateTbBorrowDto: UpdateTbBorrowDto,
  ) {
    return this.tbBorrowService.rtBorrow(+id, updateTbBorrowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tbBorrowService.remove(+id);
  }
}
