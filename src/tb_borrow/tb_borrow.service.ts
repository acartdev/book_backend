import { Injectable } from '@nestjs/common';
import { CreateTbBorrowDto } from './dto/create-tb_borrow.dto';
import { UpdateTbBorrowDto } from './dto/update-tb_borrow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TbBorrow } from './entities/tb_borrow.entity';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class TbBorrowService {
  constructor(
    @InjectRepository(TbBorrow)
    private borrowRepository: Repository<TbBorrow>,
  ) {}
  create(createTbBorrowDto: CreateTbBorrowDto) {
    return this.borrowRepository.save(createTbBorrowDto);
  }

  findAll(): Promise<TbBorrow[]> {
    return this.borrowRepository.find();
  }

  findOne(br_id: number): Promise<TbBorrow | null> {
    return this.borrowRepository.findOne({
      where: { br_id },
      relations: ['b_id', 'm_user'],
    });
  }
  findByMem(m_user: string): Promise<TbBorrow[] | null> {
    return this.borrowRepository.find({
      relations: ['b_id', 'm_user'],
      where: { m_user },
    });
  }

  update(br_id: number, updateTbBorrowDto: UpdateTbBorrowDto) {
    return this.borrowRepository.update(br_id, updateTbBorrowDto);
  }
  findBorrow(): Promise<TbBorrow[]> {
    return this.borrowRepository.find({
      relations: ['b_id', 'm_user'],
      where: { br_date_rt: IsNull() },
    });
  }
  findHist(): Promise<TbBorrow[]> {
    return this.borrowRepository.find({
      relations: ['b_id', 'm_user'],
      where: { br_date_br: Not(IsNull()) },
    });
  }
  findHistByid(m_user: string): Promise<TbBorrow[]> {
    return this.borrowRepository.find({
      relations: ['b_id', 'm_user'],
      where: { br_date_br: Not(IsNull()), m_user: m_user },
    });
  }

  borrow(br_id: number, updateTbBorrowDto: UpdateTbBorrowDto) {
    const currentDate = new Date().toISOString().slice(0, 10);

    return this.borrowRepository.update(br_id, { br_date_br: currentDate });
  }
  async rtBorrow(br_id: number, updateTbBorrowDto: UpdateTbBorrowDto) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const { br_date_br } = await this.borrowRepository.findOne({
      select: ['br_date_br'],
      where: { br_id },
    });
    const startDate = new Date(br_date_br);
    const endDate = new Date(currentDate);

    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    const fine: number = diffInDays * 5;

    return this.borrowRepository.update(br_id, {
      b_fine: fine,
      br_date_rt: currentDate,
    });
  }

  async remove(br_id: number): Promise<void> {
    await this.borrowRepository.delete(br_id);
  }
}
