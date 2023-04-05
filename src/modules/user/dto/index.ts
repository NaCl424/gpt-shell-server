import { UserType } from 'src/interface'

export class CreateUserDto {
  username: string;
  uid?: string;
  userType?: UserType;
  password?: string;
}
