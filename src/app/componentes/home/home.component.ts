// src/app/components/home.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../service/movie.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  page: number = 1;
  totalPages: number = 5; // Ajuste com base no número total de páginas

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getPopularMovies(this.page)
      .pipe(
        map(data => {
          this.movies = data.results; // Ajuste de acordo com a estrutura da resposta da API
          this.totalPages = data.total_pages; // Atualize o totalPages com base na resposta da API
        }),
        catchError(error => {
          console.error('Error fetching movies', error);
          return of({ results: [], total_pages: 0 }); // Retorna um valor padrão para evitar quebra
        })
      )
      .subscribe();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchMovies();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchMovies();
    }
  }
}
