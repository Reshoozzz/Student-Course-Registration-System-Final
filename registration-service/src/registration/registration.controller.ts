import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RegistrationService } from './registration.service';

@Controller('registrations')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  create(@Body() data: any) {
    return this.registrationService.create(data);
  }

  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationService.findOne(id);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.registrationService.findByStudent(studentId);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: string) {
    return this.registrationService.findByCourse(courseId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.registrationService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.registrationService.delete(id);
  }
}