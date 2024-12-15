import { Test, TestingModule } from '@nestjs/testing';
import { HealthcareController } from './healthcare.controller';
import { HealthcareService } from './healthcare.service';

describe('HealthcareController', () => {
  let controller: HealthcareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcareController],
      providers: [HealthcareService],
    }).compile();

    controller = module.get<HealthcareController>(HealthcareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
