// src/app/services/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'http://localhost:5000/api'; // Altere para a URL da sua API

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/popular`, {
      params: new HttpParams().set('page', page.toString())
    });
  }

  getUpcomingMovies(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/upcoming`, {
      params: new HttpParams().set('page', page.toString())
    });
  }

  getTopRatedMovies(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/top_rated`, {
      params: new HttpParams().set('page', page.toString())
    });
  }

  getNowPlayingMovies(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/now_playing`, {
      params: new HttpParams().set('page', page.toString())
    });
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/search`, {
      params: new HttpParams().set('query', query).set('page', page.toString())
    });
  }

  getFavorites(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/favorites`);
  }

  addFavorite(movieId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/movies/favorites`, { movieId });
  }

  removeFavorite(movieId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/movies/favorites`, {
      body: { movieId }
    });
  }
}
