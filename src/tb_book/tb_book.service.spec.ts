import { Test, TestingModule } from '@nestjs/testing';
import { TbBookService } from './tb_book.service';

describe('TbBookService', () => {
  let service: TbBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TbBookService],
    }).compile();

    service = module.get<TbBookService>(TbBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
