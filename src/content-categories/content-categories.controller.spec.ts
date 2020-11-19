import { Test, TestingModule } from '@nestjs/testing';
import { ContentCategoriesController } from './content-categories.controller';

describe('ContentCategoriesController', () => {
  let controller: ContentCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentCategoriesController],
    }).compile();

    controller = module.get<ContentCategoriesController>(
      ContentCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
