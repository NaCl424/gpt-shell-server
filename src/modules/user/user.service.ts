import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { CreateUserDto } from './dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    const user = await createUser.save();
    return user;
  }

  async findUser(uid: string): Promise<User[]> {
    const users = await this.userModel.find({ uid });
    return users;
  }
}
