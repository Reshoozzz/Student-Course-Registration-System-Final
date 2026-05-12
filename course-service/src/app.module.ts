import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://1:7@cluster0.tsrcaam.mongodb.net/?appName=Cluster0'
    ),
    CourseModule,
  ],
})
export class AppModule {}