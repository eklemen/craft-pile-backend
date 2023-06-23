import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Child } from '../db/models/Child.model';
import { CreateChildInput } from '../graphql';

@Injectable()
export class ChildService {
  constructor(private datasource: DataSource) {}

  async createChild(child: CreateChildInput, accountId: string) {
    return this.datasource.manager.save(Child, {
      name: child.name,
      dateOfBirth: child?.dateOfBirth,
      account: { id: accountId },
    });
  }

  async deleteChild(id: string, accountId: string) {
    await this.datasource.manager.delete(Child, { id });
    return await this.datasource.manager.find(Child, {
      where: { account: { id: accountId } },
    });
  }

  async getChildren(accountId: string) {
    return await this.datasource.manager.find(Child, {
      where: { account: { id: accountId } },
      relations: ['albums'],
    });
  }
}
