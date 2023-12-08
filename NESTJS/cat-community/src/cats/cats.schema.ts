import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  password: string;

  @Prop()
  imgUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
