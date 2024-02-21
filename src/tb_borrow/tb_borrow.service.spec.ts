import { Test, TestingModule } from '@nestjs/testing';
import { TbBorrowService } from './tb_borrow.service';

describe('TbBorrowService', () => {
  let service: TbBorrowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TbBorrowService],
    }).compile();

    service = module.get<TbBorrowService>(TbBorrowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
