import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementTypesController } from './measurement-types.controller';
import { MeasurementTypesService } from './measurement-types.service';

describe('MeasurementTypesController', () => {
  let controller: MeasurementTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasurementTypesController],
      providers: [MeasurementTypesService],
    }).compile();

    controller = module.get<MeasurementTypesController>(MeasurementTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
