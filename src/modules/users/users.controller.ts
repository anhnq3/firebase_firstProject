import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiTags('Users')
  @ApiOperation({ summary: 'Get all users' })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Get user by email' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
