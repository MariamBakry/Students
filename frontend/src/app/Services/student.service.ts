import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Student } from '../models/student.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  private apiUrl = 'http://localhost:3000/students';
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllStudents(token: string): Observable<Student[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Student[]>(this.apiUrl, { headers }).pipe(
      tap(students => this.studentsSubject.next(students))
    );
  }

  updateStudent(id: number, student: Student, token: string): Observable<Student> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student, { headers }).pipe(
      tap(() => this.getAllStudents(token).subscribe())
    );
  }

  createStudent(student: Student, token: string): Observable<Student> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<Student>(this.apiUrl, student, {headers})
    .pipe(
      tap(() => this.getAllStudents(token).subscribe())
    );
  }

  deleteStudent(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {headers})
    .pipe(
      tap(() => this.getAllStudents(token).subscribe())
      );
  }

}
