// share.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private apiUrl = 'http://localhost:3000/api/share/favorites';

  constructor(private http: HttpClient) { }

  shareFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  shareFavoritesById(shareId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${shareId}`);
  }
}
