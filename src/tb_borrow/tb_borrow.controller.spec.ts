import { Test, TestingModule } from '@nestjs/testing';
import { TbBorrowController } from './tb_borrow.controller';
import { TbBorrowService } from './tb_borrow.service';

describe('TbBorrowController', () => {
  let controller: TbBorrowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TbBorrowController],
      providers: [TbBorrowService],
    }).compile();

    controller = module.get<TbBorrowController>(TbBorrowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
