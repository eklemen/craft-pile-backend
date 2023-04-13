import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from '../s3.service';
import { S3_OPTIONS } from '../s3.constants';

describe('S3Service', () => {
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        {
          provide: S3_OPTIONS,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
