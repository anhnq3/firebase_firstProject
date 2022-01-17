import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserAuthDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    required: true,
    format: 'string',
  })
  @IsString()
  @IsOptional()
  readonly password: string;
}
