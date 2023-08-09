import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Expose()
  version: number;

  @Expose()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @Expose()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}
