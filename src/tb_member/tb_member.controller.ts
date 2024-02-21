import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TbMemberService } from './tb_member.service';
import { CreateTbMemberDto } from './dto/create-tb_member.dto';
import { UpdateTbMemberDto } from './dto/update-tb_member.dto';
import { Res } from 'src/responseType';

@Controller('member')
export class TbMemberController {
  constructor(private readonly tbMemberService: TbMemberService) {}

  @Post()
  async create(@Body() createTbMemberDto: CreateTbMemberDto) {
    const exist = await this.findOne(createTbMemberDto.m_user);
    if (exist !== null)
      return {
        status: 'Fail',
        msg: 'เพิ่มผู้ใช้งานไม่สำเร็จ มีชื่อผู้ใช้นี้อยู่แล้ว!!',
      };

    return await this.tbMemberService
      .create(createTbMemberDto)
      .then(() => {
        return { status: 'Success', msg: 'เพิ่มผู้ใช้งานสำเร็จ!!' };
      })
      .catch((e) => {
        console.log(e);

        return { status: 'Fail', msg: 'เพิ่มผู้ใช้งานไม่สำเร็จ!!' };
      });
  }

  @Get()
  findAll() {
    return this.tbMemberService.findAll();
  }
  @Get('admin')
  findAdmin() {
    return this.tbMemberService.findAdmin();
  }

  @Post('login')
  async login(@Body() createTbMemberDto: CreateTbMemberDto) {
    const exist = await this.findOne(createTbMemberDto.m_user);
    if (exist !== null) {
      if (exist.m_pass === createTbMemberDto.m_pass) {
        return { status: 'Success', msg: 'ท่านได้ทำการเข้าสู่ระบบสำเร็จ!' };
      } else {
        return {
          status: 'Fail',
          msg: 'เข้าสู่ระบบไม่สำเร็จ รหัสผ่านไม่ถูกต้อง',
        };
      }
    } else {
      return {
        status: 'Fail',
        msg: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ ไม่พบบัญชีผู้ใช้นี้',
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tbMemberService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTbMemberDto: UpdateTbMemberDto,
  ) {
    const exist = await this.findOne(updateTbMemberDto.m_user);

    if (updateTbMemberDto.m_user !== id) {
      if (exist?.m_user === updateTbMemberDto.m_user) {
        return {
          status: 'Fail',
          msg: 'แก้ไขผู้ใช้งานไม่สำเร็จ มีชื่อผู้ใช้นี้อยู่แล้ว!!',
        };
      }
    }
    return await this.tbMemberService
      .update(id, updateTbMemberDto)
      .then(() => {
        return { status: 'Success', msg: 'แก้ไขข้อมูลผู้ใช้สำเร็จ!' };
      })
      .catch((e) => {
        console.log(e);

        return { status: 'Fail', msg: 'แก้ไขข้อมูลผู้ใช้ไม่สำเร็จ!!' };
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tbMemberService
      .remove(id)
      .then(() => {
        return { status: 'Success', msg: 'ลบข้อมูลผู้ใช้สำเร็จ!' };
      })
      .catch((e) => {
        console.log(e);

        return { status: 'Fail', msg: 'ลบข้อมูลผู้ใช้ไม่สำเร็จ!!' };
      });
  }
}
