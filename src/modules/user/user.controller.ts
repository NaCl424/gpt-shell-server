import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('api/user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('user')
  async user(@Body() data: { id: string }) {
    return this.userService.findUser(data.id);
  }
}
