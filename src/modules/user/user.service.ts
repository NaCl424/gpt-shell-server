import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { CreateUserDto } from './dto'
import { UserVo } from './vo';
import { generateUserId } from 'src/utils';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserVo> {
    if (!createUserDto.uuid) {
      createUserDto.uuid = randomUUID();
    }
    const createUser = new this.userModel({
      ...createUserDto,
      userId: generateUserId(),
    });
    const { _id, username, userId, uuid, userType } = await createUser.save();
    return {
      id: _id.toString(),
      username,
      userId,
      uuid,
      userType,
    };
  }

  async findAllUsers(): Promise<UserVo[]> {
    const users = await this.userModel
      .find()
      .select(['id', 'username', 'userId', 'uuid', 'userType'])
      .exec() as UserVo[];
    return users;
  }

  async findUser(sid: string): Promise<UserVo> {
    const user = await this.userModel
      .findOne({ _id: sid })
      .select(['id', 'username', 'userId', 'uuid', 'userType'])
      .exec() as UserVo;
    return user;
  }
}
