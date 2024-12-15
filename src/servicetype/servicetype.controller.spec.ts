import { Test, TestingModule } from '@nestjs/testing';
import { ServicetypeController } from './servicetype.controller';
import { ServicetypeService } from './servicetype.service';

describe('ServicetypeController', () => {
  let controller: ServicetypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicetypeController],
      providers: [ServicetypeService],
    }).compile();

    controller = module.get<ServicetypeController>(ServicetypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
