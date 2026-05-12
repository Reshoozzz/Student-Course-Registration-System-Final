import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistrationDocument = Registration & Document;

@Schema({ timestamps: true })
export class Registration {
  @Prop({ required: true })
  studentId!: string;

  @Prop({ required: true })
  courseId!: string;

  @Prop()
  semester!: string;

  @Prop({ default: 'active' })
  status!: string;
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);