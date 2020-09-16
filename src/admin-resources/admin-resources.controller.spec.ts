import { Test, TestingModule } from '@nestjs/testing';
import { AdminResourcesController } from './admin-resources.controller';

describe('AdminResourcesController', () => {
  let controller: AdminResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminResourcesController],
    }).compile();

    controller = module.get<AdminResourcesController>(AdminResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
