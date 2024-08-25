import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/${query}`);
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}`);
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favorites`);
  }

  addFavorite(movie: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/favorites`, movie);
  }

  removeFavorite(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${id}`);
  }
}
