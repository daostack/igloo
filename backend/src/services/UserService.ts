import { getAddressStrict } from '@igloo/core';
import { Prisma, User } from '@prisma/client';

import { UserRepository } from '../repositories/UserRepository';

import { VerificationService } from './verification/VerificationService';

export interface UserCreateDetails {
  address: string;
}

export class UserService {
  private verifications: VerificationService;

  constructor(protected userRepo: UserRepository) {}

  async exist(address: string): Promise<boolean> {
    return this.userRepo.exist(getAddressStrict(address));
  }

  async get(address: string): Promise<User | undefined> {
    return this.userRepo.get(getAddressStrict(address));
  }

  /** Sensitive method, call only after signature has been verified. */
  async getOrCreate(details: UserCreateDetails): Promise<User> {
    const exist = await this.exist(details.address);

    if (!exist) {
      const createData: Prisma.UserCreateInput = {
        address: getAddressStrict(details.address),
      };

      return this.create(createData);
    }

    return this.get(details.address);
  }

  async create(details: Prisma.UserCreateInput): Promise<User> {
    return this.userRepo.create(details);
  }

  deleteAll(): Promise<void> {
    return this.userRepo.deleteAll();
  }
}
