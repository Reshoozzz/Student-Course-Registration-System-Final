import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    MongooseModule.forRoot(
  'mongodb+srv://1:7@cluster0.tsrcaam.mongodb.net/?appName=Cluster0'
  ),
    StudentModule,
  ],
})
export class AppModule {}