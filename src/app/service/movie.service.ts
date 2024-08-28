import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

interface MovieData {
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  getPopularMovies(page: number = 1): Observable<MovieData> {
    return this.http.get<MovieData>(`${this.apiUrl}/popular?page=${page}`, { headers: this.getHeaders() });
  }

  getUpcomingMovies(page: number = 1): Observable<MovieData> {
    return this.http.get<MovieData>(`${this.apiUrl}/upcoming?page=${page}`, { headers: this.getHeaders() });
  }

  getTopRatedMovies(page: number = 1): Observable<MovieData> {
    return this.http.get<MovieData>(`${this.apiUrl}/top_rated?page=${page}`, { headers: this.getHeaders() });
  }

  getNowPlayingMovies(page: number = 1): Observable<MovieData> {
    return this.http.get<MovieData>(`${this.apiUrl}/now_playing?page=${page}`, { headers: this.getHeaders() });
  }

  searchMovies(query: string, page: number = 1): Observable<MovieData> {
    return this.http.get<MovieData>(`${this.apiUrl}/search?query=${query}&page=${page}`, { headers: this.getHeaders() });
  }

  getFavorites(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/favorites`, { headers: this.getHeaders() });
  }

  addFavorite(movieId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/favorites`, { movieId }, { headers: this.getHeaders() });
  }

  removeFavorite(movieId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/favorites/${movieId}`, { headers: this.getHeaders()});
  }
}
