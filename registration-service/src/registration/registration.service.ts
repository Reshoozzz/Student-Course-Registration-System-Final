import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registration, RegistrationDocument } from './registration.schema';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(Registration.name)
    private registrationModel: Model<RegistrationDocument>,
  ) {}

  create(data: any) {
    const newRegistration = new this.registrationModel(data);
    return newRegistration.save();
  }

  findAll() {
    return this.registrationModel.find();
  }

  findOne(id: string) {
    return this.registrationModel.findById(id);
  }

  findByStudent(studentId: string) {
    return this.registrationModel.find({ studentId });
  }

  findByCourse(courseId: string) {
    return this.registrationModel.find({ courseId });
  }

  update(id: string, data: any) {
    return this.registrationModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.registrationModel.findByIdAndDelete(id);
  }
}