// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router:Router) {}

  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  //this save a value in the local storage to let the user login until he logout or session get expired
  setLoggedIn(status: boolean) {
    localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
  }
  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.http.post(`${this.apiUrl}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => {
        localStorage.removeItem('jwtToken');
        this.router.navigate(['']);
      }, error => {
        console.error('Error during logout:', error);
      });
    }
  }
}
