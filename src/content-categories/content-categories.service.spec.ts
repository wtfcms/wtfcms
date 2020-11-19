import { Test, TestingModule } from '@nestjs/testing';
import { ContentCategoriesService } from './content-categories.service';

describe('ContentCategoriesService', () => {
  let service: ContentCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentCategoriesService],
    }).compile();

    service = module.get<ContentCategoriesService>(ContentCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
