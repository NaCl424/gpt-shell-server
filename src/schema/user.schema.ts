import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserType } from 'src/interface';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  }
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  uuid: string;

  @Prop({ default: UserType.Guest })
  userType: UserType;

  @Prop({ default: '' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
