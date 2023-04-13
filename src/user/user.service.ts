import { Injectable } from '@nestjs/common';
import { Account } from '../db/models/Account.model';
import { User } from '../db/models/User.model';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private datasource: DataSource) {}

  async getUserById(email: string): Promise<User> {
    // TODO: limit albums
    const users = await this.datasource.manager.find(User, {
      where: { email },
      relations: ['account', 'account.children', 'account.children.albums'],
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
