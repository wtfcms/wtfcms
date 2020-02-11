import { Test, TestingModule } from '@nestjs/testing';
import { AdminGroupService } from './admin-group.service';

describe('AdminGroupService', () => {
  let service: AdminGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminGroupService],
    }).compile();

    service = module.get<AdminGroupService>(AdminGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
