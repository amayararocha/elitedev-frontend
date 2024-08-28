import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { environment } from '../environment/environment';

export interface RegisterResponse {
  message: string;
  token: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  register(username: string, email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}api/users/register`, { username, email, password });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}api/users/login`, { username, password }).pipe(
      tap((response: LoginResponse) => { 
        localStorage.setItem('token', response.token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  refreshToken(): Observable<{ message: string, token: string }> {
    return this.http.post<{ message: string, token: string }>(`${this.apiUrl}/refresh-token`, {});
  }

  private checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!token);
  }
}
