import { UserType } from 'src/interface'

export class CreateGuestUserDto {
  username: string;
  uuid?: string;
}

export class LoginDto {
  username: string;
  userId: string;
}
