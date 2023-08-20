import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  @Serialize(UserDto)
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('/login')
  login(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
