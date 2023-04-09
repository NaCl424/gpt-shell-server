import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import {Request} from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

declare module 'express' {
  interface Request {
      user: {
        username: string;
        password: string;
      };
  }
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
