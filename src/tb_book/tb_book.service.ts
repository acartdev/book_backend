import { Injectable } from '@nestjs/common';
import { CreateTbBookDto } from './dto/create-tb_book.dto';
import { UpdateTbBookDto } from './dto/update-tb_book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TbBook } from './entities/tb_book.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TbBookService {
  constructor(
    @InjectRepository(TbBook)
    private bookRepository: Repository<TbBook>,
  ) {}
  create(createTbBookDto: CreateTbBookDto) {
    return this.bookRepository.save(createTbBookDto);
  }

  findAll(): Promise<TbBook[]> {
    return this.bookRepository.find();
  }
  async filterFind(query: string): Promise<TbBook[]> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    queryBuilder.where('(book.b_id like :query or book.b_name like :query)', {
      query: `%${query}%`,
    });
    const books = await queryBuilder.getMany();
    return books;
  }

  findOne(b_id: string): Promise<TbBook | null> {
    return this.bookRepository.findOneBy({ b_id });
  }

  update(b_id: string, updateTbBookDto: UpdateTbBookDto) {
    return this.bookRepository.update(b_id, updateTbBookDto);
  }

  async remove(b_id: string): Promise<void> {
    await this.bookRepository.delete({ b_id });
  }
}
