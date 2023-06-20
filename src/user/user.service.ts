import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Account } from '../db/models/Account.model';
import { User } from '../db/models/User.model';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private datasource: DataSource) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.datasource.manager.findOne(User, {
      where: { email },
      relations: ['account'],
    });
  }
  async getUserById(email: string): Promise<User> {
    // TODO: limit albums
    try {
      return this.datasource.manager.findOne(User, {
        where: { email },
        relations: ['account', 'account.children'],
      });
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error:
            'You do not have access to this record, or you token is expired.',
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: err,
        },
      );
    }
  }

  async createUser({ email }: { email: string }) {
    const account = await this.datasource.getRepository(Account).save({});
    return this.datasource.manager.save(User, {
      email,
      account,
    });
  }
}
