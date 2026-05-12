import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  // STUDENTS
  @Post('students')
  createStudent(@Body() data: any) {
    return this.gatewayService.forwardToStudent('POST', '/students', data);
  }

  @Get('students')
  getStudents() {
    return this.gatewayService.forwardToStudent('GET', '/students');
  }

  @Get('students/:id')
  getStudent(@Param('id') id: string) {
    return this.gatewayService.forwardToStudent('GET', `/students/${id}`);
  }

  @Put('students/:id')
  updateStudent(@Param('id') id: string, @Body() data: any) {
    return this.gatewayService.forwardToStudent('PUT', `/students/${id}`, data);
  }

  @Delete('students/:id')
  deleteStudent(@Param('id') id: string) {
    return this.gatewayService.forwardToStudent('DELETE', `/students/${id}`);
  }

  // COURSES
  @Post('courses')
  createCourse(@Body() data: any) {
    return this.gatewayService.forwardToCourse('POST', '/courses', data);
  }

  @Get('courses')
  getCourses() {
    return this.gatewayService.forwardToCourse('GET', '/courses');
  }

  @Get('courses/:id')
  getCourse(@Param('id') id: string) {
    return this.gatewayService.forwardToCourse('GET', `/courses/${id}`);
  }

  @Put('courses/:id')
  updateCourse(@Param('id') id: string, @Body() data: any) {
    return this.gatewayService.forwardToCourse('PUT', `/courses/${id}`, data);
  }

  @Delete('courses/:id')
  deleteCourse(@Param('id') id: string) {
    return this.gatewayService.forwardToCourse('DELETE', `/courses/${id}`);
  }

  // REGISTRATIONS
  @Post('registrations')
  createRegistration(@Body() data: any) {
    return this.gatewayService.forwardToRegistration('POST', '/registrations', data);
  }

  @Get('registrations')
  getRegistrations() {
    return this.gatewayService.forwardToRegistration('GET', '/registrations');
  }

  @Get('registrations/:id')
  getRegistration(@Param('id') id: string) {
    return this.gatewayService.forwardToRegistration('GET', `/registrations/${id}`);
  }

  @Put('registrations/:id')
  updateRegistration(@Param('id') id: string, @Body() data: any) {
    return this.gatewayService.forwardToRegistration('PUT', `/registrations/${id}`, data);
  }

  @Delete('registrations/:id')
  deleteRegistration(@Param('id') id: string) {
    return this.gatewayService.forwardToRegistration('DELETE', `/registrations/${id}`);
  }
}