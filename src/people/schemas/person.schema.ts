import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PersonDocument = Person & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      // delete obsolete data
      delete ret._id;
    },
  },
  versionKey: false,
})
export class Person {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: string;

  @Prop({
@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class Person {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  photo: string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  firstname: string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  })
  lastname: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  entity: string;

  @Prop({
    type: Date,
    required: true,
  })
  birthDate: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    match: /^(\+\d{11})$/,
  })
  phone: string;

  @Prop(
    raw({
      street: {
        type: String,
        required: true,
        trim: true,
      },
      postalCode: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
    }),
  )
  address: any;

  @Prop({
    type: Boolean,
    required: true,
  })
  isManager: boolean;

  @Prop({
    type: String,
    trim: true,
  })
  manager: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  managerId: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
