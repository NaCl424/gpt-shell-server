import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { CreateGuestUserDto } from './dto'
import { UserVo } from './vo';
import { generateUserId } from 'src/utils';
import { randomUUID } from 'crypto';
import { UserType } from 'src/interface'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>
  ) {}

  async createGuest(createGuestUserDto: CreateGuestUserDto): Promise<UserVo> {
    if (!createGuestUserDto.uuid) {
      createGuestUserDto.uuid = randomUUID();
    }
    const createUser = new this.userModel({
      ...createGuestUserDto,
      userId: generateUserId(),
      nickname: createGuestUserDto.username,
      userType: UserType.Guest,
    });
    const { _id, username, userId, nickname, uuid, userType } = await createUser.save();
    return {
      id: _id.toString(),
      username,
      userId,
      nickname,
      uuid,
      userType,
    };
  }

  async findAllUsers(): Promise<UserVo[]> {
    const users = await this.userModel
      .find()
      .select(['id', 'username', 'userId', 'nickname', 'uuid', 'userType'])
      .exec() as UserVo[];
    return users;
  }

  async findUser(sid: string): Promise<UserVo> {
    const user = await this.userModel
      .findOne({ _id: sid })
      .select(['id', 'username', 'userId', 'nickname', 'uuid', 'userType'])
      .exec() as UserVo;
    return user;
  }
}
