import { PrismaClient, Prisma, User } from '@prisma/client';

export class UserRepository {
  constructor(protected client: PrismaClient) {}

  async create(userDetails: Prisma.UserCreateInput): Promise<User> {
    return this.client.user.create({
      data: userDetails,
    });
  }

  async get(address: string): Promise<User | undefined> {
    const user = this.client.user.findUnique({ where: { address: address } });
    return user !== null ? user : undefined;
  }

  async exist(address: string): Promise<boolean> {
    return this.client.user
      .findFirst({ where: { address: address } })
      .then(Boolean);
  }

  async deleteAll(): Promise<void> {
    await this.client.user.deleteMany();
  }
}
