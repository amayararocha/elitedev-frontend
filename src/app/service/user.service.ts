import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

interface RegisterResponse {
  message: string;
  token: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}api/users/register`, { username, email, password });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}api/users/login`, { username, password });
  }

  refreshToken(): Observable<{ message: string, token: string }> {
    return this.http.post<{ message: string, token: string }>(`${this.apiUrl}/refresh-token`, {});
  }
}
