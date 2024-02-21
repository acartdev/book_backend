import { Test, TestingModule } from '@nestjs/testing';
import { TbBookController } from './tb_book.controller';
import { TbBookService } from './tb_book.service';

describe('TbBookController', () => {
  let controller: TbBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TbBookController],
      providers: [TbBookService],
    }).compile();

    controller = module.get<TbBookController>(TbBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
