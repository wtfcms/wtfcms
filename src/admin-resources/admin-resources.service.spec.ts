import { Test, TestingModule } from '@nestjs/testing';
import { AdminResourcesService } from './admin-resources.service';

describe('AdminResourcesService', () => {
  let service: AdminResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminResourcesService],
    }).compile();

    service = module.get<AdminResourcesService>(AdminResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
