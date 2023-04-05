import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserType } from 'src/interface';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  uid: string;

  @Prop({ default: UserType.Guest })
  userType: UserType;

  @Prop({ default: '' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
