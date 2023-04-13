import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from '../db/models/Child.model';
import { ChildResolver } from './child.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Child])],
  providers: [ChildService, ChildResolver],
  exports: [ChildService],
})
export class ChildModule {}
