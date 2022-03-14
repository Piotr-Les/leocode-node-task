import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        email: 'user1@example.com',
        password:
          '$2a$04$FRTr5yCAXNCZ3f2w7q1qBej8Jdcapv/eCZU.nAMmamClitSsxM2vG',
      },
      {
        id: 2,
        email: 'user2@example.com',
        password:
          '$2a$04$9ZNCaGq.bejyHbebdsFaN.x4rNMvdpOOrSVnVhVXHnUPAEB/RNK6u',
      },
      {
        id: 3,
        email: 'user3@example.com',
        password:
          '$2a$04$AAJPqIRULvIg7x8SV2xFz.U84aaPNDl9C5NlrnRbH5IzTiBS2ioTC',
      },
    ];
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
