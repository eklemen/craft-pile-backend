import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<any | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async getUser(id: string) {
    return { password: 'potato' };
    // return await this.prisma.user.findUnique({
    //   where: {
    //     id,
    //   },
    // });
  }
}
