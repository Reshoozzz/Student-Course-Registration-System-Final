import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
  ) {}

  create(data: any) {
    const newCourse = new this.courseModel(data);
    return newCourse.save();
  }

  findAll() {
    return this.courseModel.find();
  }

  findOne(id: string) {
    return this.courseModel.findById(id);
  }

  update(id: string, data: any) {
    return this.courseModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.courseModel.findByIdAndDelete(id);
  }
}