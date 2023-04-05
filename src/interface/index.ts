import { HttpStatus } from '@nestjs/common';

export interface Response<T> {
  code: HttpStatus;
  data: T;
  msg: string;
}

export enum UserType {
  Guest,
  Account,
}
