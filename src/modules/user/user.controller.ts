import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateGuestUserDto } from './dto';

@Controller('api/user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post('createGuest')
  async createGuest(@Body() createGuestUserDto: CreateGuestUserDto) {
    return this.userService.createGuest(createGuestUserDto);
  }

  @Get('user')
  async user(@Body() data: { id: string }) {
    return this.userService.findUser(data.id);
  }
}
