import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { LoginUserAuthDto } from './dto/login-user-auth.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { GetUser } from './helper/getUser.decorator';
import { JwtAuthGuard } from './helper/jwt-auth.guard';
// import { JwtAuthGuard } from './helper/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Get user  by email' })
  @HttpCode(HttpStatus.OK)
  // Bearer co lien quan
  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @Get(':email')
  getUserByEmail(@GetUser() payload: any, @Param('email') email: string) {
    // return payload;
    payload;
    return this.authService.getUserByEmail(email);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Create an user' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/register')
  createUser(@Body() createUserAuthDto: CreateUserAuthDto) {
    return this.authService.createUser(createUserAuthDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login an user' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  login(@Body() loginUserAuthDto: LoginUserAuthDto) {
    return this.authService.login(loginUserAuthDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Delete a user by Id' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.authService.deleteUserById(id);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Update an user by Id' })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateuserAuthDto: UpdateUserAuthDto,
  ) {
    return this.authService.updateUserById(id, updateuserAuthDto);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Check authenticate' })
  @HttpCode(HttpStatus.OK)
  @Get('verify/:token')
  getMe(@Param('token') token: string) {
    return this.authService.getMe(token);
  }
}
