import { Test, TestingModule } from '@nestjs/testing';
import { TbMemberController } from './tb_member.controller';
import { TbMemberService } from './tb_member.service';

describe('TbMemberController', () => {
  let controller: TbMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TbMemberController],
      providers: [TbMemberService],
    }).compile();

    controller = module.get<TbMemberController>(TbMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
