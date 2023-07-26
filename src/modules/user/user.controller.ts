import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserPasswordDto } from './dto/updateUserPassword.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { IdParams } from 'src/common/dto/id.params';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getUserById(@Param() { id }: IdParams) {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put('/:id')
  updateUserPassword(
    @Param() { id }: IdParams,
    @Body() dto: UpdateUserPasswordDto,
  ) {
    return this.userService.updateUserPassword(id, dto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param() { id }: IdParams) {
    return this.userService.deleteUser(id);
  }
}
