import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://1:7@cluster0.tsrcaam.mongodb.net/?appName=Cluster0'
    ),
    RegistrationModule,
  ],
})
export class AppModule {}