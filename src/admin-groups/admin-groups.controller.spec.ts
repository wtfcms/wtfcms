import { Test, TestingModule } from '@nestjs/testing';
import { AdminGroupsController } from './admin-groups.controller';

describe('AdminGroups Controller', () => {
  let controller: AdminGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminGroupsController],
    }).compile();

    controller = module.get<AdminGroupsController>(AdminGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
