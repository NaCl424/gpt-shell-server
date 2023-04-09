import { Controller, Get, Post, Inject, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateGuestUserDto } from './dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('api/user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post('createGuest')
  async createGuest(@Body() createGuestUserDto: CreateGuestUserDto) {
    return this.userService.createGuest(createGuestUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async user() {
    return this.userService.findAllUsers();
  }
}
