import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserPasswordDto } from './dto/updateUserPassword.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public getAllUsers() {
    return this.userRepository.find();
  }

  public async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id: ${id} not found`);

    return user;
  }

  public async createUser(createDto: CreateUserDto) {
    const user = this.userRepository.create(createDto);
    return this.userRepository.save(user);
  }

  public async updateUserPassword(
    id: string,
    updateDto: UpdateUserPasswordDto,
  ) {
    const user = await this.getUserById(id);

    if (user.password !== updateDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    return this.userRepository.save({
      ...user,
      password: updateDto.newPassword,
      version: user.version + 1,
      updatedAt: new Date(),
    });
  }

  public async deleteUser(id: string) {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
    return null;
  }
}
