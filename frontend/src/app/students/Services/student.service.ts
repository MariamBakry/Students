import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../student.model';
import { ConfigService } from '../../config.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly Base_URL: string;

  constructor(private http: HttpClient,
    private readonly configService: ConfigService) {
      this.Base_URL = this.configService.getBaseUrl('students');
    }

  getAllStudents(){
    return this.http.get(this.Base_URL);
  }
}
