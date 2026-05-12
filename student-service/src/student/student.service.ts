import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  create(data: any) {
    const newStudent = new this.studentModel(data);
    return newStudent.save();
  }

  findAll() {
    return this.studentModel.find();
  }

  findOne(id: string) {
    return this.studentModel.findById(id);
  }

  update(id: string, data: any) {
    return this.studentModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.studentModel.findByIdAndDelete(id);
  }
}