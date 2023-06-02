import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from '../storage.service';
import { STORAGE_OPTIONS } from '../storage.constants';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        {
          provide: STORAGE_OPTIONS,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
