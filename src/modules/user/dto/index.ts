import { UserType } from 'src/interface'

export class CreateUserDto {
  username: string;
  uuid?: string;
  userType?: UserType;
  password?: string;
}
