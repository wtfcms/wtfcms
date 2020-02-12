import { Test, TestingModule } from '@nestjs/testing';
import { AdminGroupsService } from './admin-groups.service';

describe('AdminGroupsService', () => {
  let service: AdminGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminGroupsService],
    }).compile();

    service = module.get<AdminGroupsService>(AdminGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
