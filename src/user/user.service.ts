import { Injectable } from '@nestjs/common';
import { Account } from '../db/models/Account.model';
import { User } from '../db/models/User.model';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private datasource: DataSource) {}

  async getUser(email: string): Promise<any | undefined> {
    return await this.datasource.manager.findOneBy(User, { email });
  }

  async createUser({ email, password }: { email: string; password: string }) {
    const account = await this.datasource.getRepository(Account).save({});
    return await this.datasource.manager.save(User, {
      email,
      password,
      account,
    });
  }
}
