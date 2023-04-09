import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
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
    const { uuid: createUUID } = createGuestUserDto;
    if (!createUUID) {
      throw new BadRequestException('uuid不能为空!');
    }

    const user = await this.userModel
      .findOne({ uuid: createUUID })
      .select(['id', 'username', 'userId', 'nickname', 'uuid', 'userType'])
      .exec() as UserVo;
    if (user) {
      return user;
    }
    const createUserId = generateUserId();
    const createUser = new this.userModel({
      username: `User_${createUserId}`,
      userId: createUserId,
      nickname: `User_${createUserId}`,
      uuid: createUUID,
      userType: UserType.Guest,
      password: createUserId
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

  async findUser(username: string): Promise<UserVo & { password: string }> {
    const user = await this.userModel
      .findOne({ username })
      .select(['id', 'username', 'userId', 'nickname', 'uuid', 'userType', 'password'])
      .exec() as UserVo & { password: string };
    return user;
  }
}
