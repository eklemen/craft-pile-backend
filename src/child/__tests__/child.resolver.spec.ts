import { Test, TestingModule } from '@nestjs/testing';
import { ChildResolver } from '../child.resolver';

describe('ChildResolver', () => {
  let resolver: ChildResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChildResolver],
    }).compile();

    resolver = module.get<ChildResolver>(ChildResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
