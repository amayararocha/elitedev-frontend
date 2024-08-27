// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; // Substitua pela URL real do seu backend

  constructor(private http: HttpClient) {}

  // Registro de usuário com username, email e senha
  register(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Login do usuário com username e senha
  login(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  // Atualização do token - você pode precisar adicionar o cabeçalho de autorização
  refreshToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/refresh-token`, { headers });
  }
}
