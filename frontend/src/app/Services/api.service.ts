import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:3000';
    private token = '';
    private jwtToken$ = new BehaviorSubject<string>(this.token);

    constructor(private http: HttpClient,
                private router: Router,
                private toast: ToastrService
    ) {
        const featchedToken = localStorage.getItem('act');
        if(featchedToken){
            this.token = atob(featchedToken);
            this.jwtToken$.next(this.token);
        }
    }

    get jwtUserToken(): Observable<string>{
        return this.jwtToken$.asObservable();
    }

    getAllStudents(): Observable<any> {
        return this.http.get(`${this.apiUrl}/students`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }
        );
    }

    login(username: string, password: string) {

        this.http.post(`${this.apiUrl}/auth/login`, {username, password})
          // @ts-ignore
          .subscribe((res: { token: string }) => {
            this.token = res.token;
    
            if (this.token) {
              this.toast.success('Login successful, redirecting now...', '', {
                timeOut: 700,
                positionClass: 'toast-top-center'
              }).onHidden.toPromise().then(() => {
                this.jwtToken$.next(this.token);
                localStorage.setItem('act', btoa(this.token));
                this.router.navigateByUrl('/').then();
              });
            }
          }, (err: HttpErrorResponse) => console.log(err.message));
    }


    createStudent(firstName:string, lastName:string, email:string, age:number, status:string, country:string, gender:string) {
        return this.http.post(`${this.apiUrl}/students`, {firstName, lastName, email, age, status, country, gender}, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
      }
    
      
      updateStudent(fName:string, lName:string, mail:string, agee:number, statuss:string, ctry:string, gdr:string, studentId: number) {
        return this.http.patch(`${this.apiUrl}/students/${studentId}`, {firstName:fName, lastName:lName, email:mail, age:agee, status:statuss, country:ctry, gender:gdr}, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }).pipe(
          tap(res => {
            if (res) {
              this.toast.success('Status updated successfully', '', {
                timeOut: 1000
              });
            }
          })
        );
      }
    
      deleteStudent(studentId: number) {
        return this.http.delete(`${this.apiUrl}/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }).pipe(
          tap(res => {
            // @ts-ignore
            if (res.success) {
              this.toast.success('Todo deleted successfully');
            }
          })
        );
      }
}