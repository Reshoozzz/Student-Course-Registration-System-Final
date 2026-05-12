import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GatewayService {
  private studentServiceUrl = 'http://localhost:3001';
  private courseServiceUrl = 'http://localhost:3002';
  private registrationServiceUrl = 'http://localhost:3003';

  async forwardToStudent(method: string, path: string, data?: any) {
    const response = await axios({
      method,
      url: `${this.studentServiceUrl}${path}`,
      data,
    });
    return response.data;
  }

  async forwardToCourse(method: string, path: string, data?: any) {
    const response = await axios({
      method,
      url: `${this.courseServiceUrl}${path}`,
      data,
    });
    return response.data;
  }

  async forwardToRegistration(method: string, path: string, data?: any) {
    const response = await axios({
      method,
      url: `${this.registrationServiceUrl}${path}`,
      data,
    });
    return response.data;
  }
}