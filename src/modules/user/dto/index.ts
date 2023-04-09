import { UserType } from 'src/interface'

export class CreateGuestUserDto {
  uuid: string;
}

export class LoginDto {
  username: string;
  userId: string;
}
