import { Test, TestingModule } from '@nestjs/testing';
import { TbMemberService } from './tb_member.service';

describe('TbMemberService', () => {
  let service: TbMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TbMemberService],
    }).compile();

    service = module.get<TbMemberService>(TbMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
