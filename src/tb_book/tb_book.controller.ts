import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TbBookService } from './tb_book.service';
import { CreateTbBookDto } from './dto/create-tb_book.dto';
import { UpdateTbBookDto } from './dto/update-tb_book.dto';
import { TbBook } from './entities/tb_book.entity';

@Controller('books')
export class TbBookController {
  constructor(private readonly tbBookService: TbBookService) {}

  @Post()
  async create(@Body() createTbBookDto: CreateTbBookDto) {
    const exist = await this.findExist(createTbBookDto.b_id);
    // console.log(exist);

    if (exist != null)
      return {
        status: 'Fail',
        msg: 'บันทึกข้อมูลหนังสือไม่สำเร็จ มีรหัสหนังสือนี้ยู่แล้ว!!',
      };
    return await this.tbBookService
      .create(createTbBookDto)
      .then(async () => {
        return { status: 'Success', msg: 'บันทึกข้อมูลหนังสือสำเร็จ!!' };
      })
      .catch((e) => {
        return { status: 'Fail', msg: 'บันทึกข้อมูลหนังสือไม่สำเร็จ!!' };
      });
  }

  @Get()
  async findAll() {
    const books = await this.tbBookService.findAll().then((value) => {
      return value.map((e) => {
        return Object.assign({}, e, {
          category:
            e.b_category === 1
              ? 'วิชาการ'
              : e.b_category === 2
                ? 'วรรณากรรม'
                : 'เบ็ดเตล็ด',
        });
      });
    });

    return books;
  }

  @Get('search')
  async findQuery(@Query('search') searchs: string) {
    return await this.tbBookService.filterFind(searchs).then((value) => {
      console.log(value);

      return value.map((e) => {
        return Object.assign({}, e, {
          category:
            e.b_category === 1
              ? 'วิชาการ'
              : e.b_category === 2
                ? 'วรรณากรรม'
                : 'เบ็ดเตล็ด',
        });
      });
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tbBookService.findOne(id).then((value) => {
      // console.log(value);

      return (value = Object.assign({}, value, {
        category:
          value?.b_category === 1
            ? 'วิชาการ'
            : value?.b_category === 2
              ? 'วรรณากรรม'
              : 'เบ็ดเตล็ด',
      }));
    });
  }
  async findExist(@Param('id') id: string) {
    return await this.tbBookService.findOne(id);
    // console.log(value);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTbBookDto: UpdateTbBookDto,
  ) {
    const exist = await this.findOne(updateTbBookDto.b_id);

    if (updateTbBookDto.b_id !== id) {
      if (exist.b_id == updateTbBookDto.b_id) {
        return {
          status: 'Fail',
          msg: 'แก้ไขข้อมูลหนังสือไม่สำเร็จ มีรหัสหนังสือนี้ยู่แล้ว!!',
        };
      }
    }

    if ('category' in updateTbBookDto) {
      delete updateTbBookDto.category;
    }
    return await this.tbBookService
      .update(id, updateTbBookDto)
      .then(() => {
        return { status: 'Success', msg: 'แก้ไขข้อมูลหนังสือสำเร็จ!!' };
      })
      .catch((e) => {
        console.log(e);

        return { status: 'Fail', msg: 'แก้ไขข้อมูลหนังสือไม่สำเร็จ!!' };
      });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tbBookService
      .remove(id)
      .then(() => {
        return { status: 'Success', msg: 'ลบข้อมูลหนังสือสำเร็จ!!' };
      })
      .catch((e) => {
        return { status: 'Fail', msg: 'ลบข้อมูลหนังสือไม่สำเร็จ!!' };
      });
  }
}
