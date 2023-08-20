import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
const CRYPT_SALT = process.env.CRYPT_SALT;
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ login, password }: SignInDto) {
    const user = await this.usersService.findUser(login);

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new ForbiddenException('Bad credentials');
    }

    return user;
  }

  async signUp({ login, password }: SignUpDto) {
    const hash = (await scrypt(password, CRYPT_SALT, 32)) as Buffer;
    const encrypted = CRYPT_SALT + '.' + hash.toString('hex');

    return this.usersService.createUser({ login, password: encrypted });
  }

  async signIn(dto: SignInDto) {
    const user = await this.validateUser(dto);
    const payload = { userId: user.id, login: user.login };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
