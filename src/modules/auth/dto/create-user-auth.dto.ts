import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserAuthDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
