import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, password: user.password, uid: user.userId  };
    return {
      userInfo: {
        id: user.id,
        username:user.username, 
        userId: user.userId,
        nickname: user.nickname,
        uuid: user.uuid,
        userType: user.userType,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

}
