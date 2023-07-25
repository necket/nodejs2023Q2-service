import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User } from 'src/db/types/User';
import { mockUsers } from './mockData/mockUsers';

export class UserDb {
  private users: User[] = [];

  constructor() {
    this.users = mockUsers;
  }

  public findById = (id: string) => {
    return this.users.find((user) => user.id === id);
  };

  public findByIdOrFail = (id: string) => {
    const user = this.findById(id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    return user;
  };

  public find = () => {
    return this.users;
  };

  public create = ({ login, password }: Partial<User>) => {
    const user: User = {
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users = [...this.users, user];

    return user;
  };

  public update = (id: string, fields: Partial<User>) => {
    const user = this.findByIdOrFail(id);
    const updatedUser = {
      ...user,
      ...fields,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.users = this.users.map((usr) => (usr.id === id ? updatedUser : usr));
    return updatedUser;
  };

  public delete = (id: string) => {
    this.findByIdOrFail(id);
    this.users = this.users.filter((usr) => usr.id !== id);
    return null;
  };
}
