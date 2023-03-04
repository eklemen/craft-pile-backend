import { Injectable } from '@nestjs/common';
import { Account } from '../db/models/Account.model';
import { User } from '../db/models/User.model';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private datasource: DataSource) {}

  async getUserById(id: string): Promise<User> {
    const users = await this.datasource.manager.find(User, {
      where: { id },
      relations: ['account', 'account.albums', 'account.children'],
    });
    return users[0];
  }

  async createUser({ email, password }: { email: string; password: string }) {
    const account = await this.datasource.getRepository(Account).save({});
    const user = await this.datasource.manager.save(User, {
      email,
      password,
      account,
    });
    delete user.password;
    return user;
  }
}
