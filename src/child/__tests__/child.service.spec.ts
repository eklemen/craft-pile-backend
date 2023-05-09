import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Child } from '../../db/models/Child.model';
import { ChildService } from '../child.service';

describe('ChildService', () => {
  let service: ChildService;
  let datasource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChildService,
        {
          provide: DataSource,
          useValue: {
            manager: {
              save: jest.fn(),
              find: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: getRepositoryToken(Child),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ChildService>(ChildService);
    datasource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createChild', () => {
    it('should create a child', async () => {
      const result = [new Child()];
      const childInput = { name: 'Test Child', dateOfBirth: '2000-01-01' };

      jest
        .spyOn(datasource.manager, 'save')
        .mockImplementation(() => Promise.resolve());
      jest
        .spyOn(datasource.manager, 'find')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.createChild(childInput, 'account-1')).toBe(result);
    });
  });

  describe('deleteChild', () => {
    it('should delete a child', async () => {
      const result = [new Child()];

      jest
        .spyOn(datasource.manager, 'delete')
        .mockImplementation(() => Promise.resolve(new DeleteResult()));
      jest
        .spyOn(datasource.manager, 'find')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.deleteChild('child-1', 'account-1')).toBe(result);
    });
  });

  describe('getChildren', () => {
    it('should return children', async () => {
      const result = [new Child()];

      jest
        .spyOn(datasource.manager, 'find')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.getChildren('account-1')).toBe(result);
    });
  });
});
