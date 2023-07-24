import { ForbiddenException, Injectable } from '@nestjs/common';
import { db } from 'src/db/db';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserPasswordDto } from './dto/updateUserPassword.dto';

@Injectable()
export class UserService {
  public getAllUsers() {
    return db.user.find();
  }

  public getUserById(id: string) {
    return db.user.findByIdOrFail(id);
  }

  public createUser(createDto: CreateUserDto) {
    return db.user.create(createDto);
  }

  public updateUserPassword(id: string, updateDto: UpdateUserPasswordDto) {
    const user = db.user.findByIdOrFail(id);

    if (user.password !== updateDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    return db.user.update(id, { password: updateDto.newPassword });
  }

  public deleteUser(id: string) {
    return db.user.delete(id);
  }
}
