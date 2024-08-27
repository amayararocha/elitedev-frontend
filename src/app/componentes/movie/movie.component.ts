import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class MovieComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  categories = ['popular', 'top_rated', 'upcoming'];
  selectedCategory = 'popular';
  searchQuery = '';
  page = 1;
  favorites: string[] = []; 
  
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadFavorites(); 
  }

  loadMovies(): void {
    switch (this.selectedCategory) {
      case 'popular':
        this.movieService.getPopularMovies(this.page).subscribe(data => this.handleResponse(data));
        break;
      case 'top_rated':
        this.movieService.getTopRatedMovies(this.page).subscribe(data => this.handleResponse(data));
        break;
      case 'upcoming':
        this.movieService.getUpcomingMovies(this.page).subscribe(data => this.handleResponse(data));
        break;
    }
  }

  searchMovies(): void {
    if (this.searchQuery) {
      this.movieService.searchMovies(this.searchQuery, this.page).subscribe(data => this.handleResponse(data));
    } else {
      this.loadMovies();
    }
  }

  handleResponse(data: any): void {
    this.movies = data.results;
    this.filteredMovies = this.movies;
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadMovies();
  }

  onSearchChange(): void {
    this.searchMovies();
  }

  formatCategory(category: string): string {
    return category.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }

  loadFavorites(): void {
    this.movieService.getFavorites().subscribe(
      (favorites: string[]) => {
        this.favorites = favorites;
      },
      (error) => {
        console.error('Erro ao carregar os favoritos:', error);
      }
    );
  }

  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie.id)) {
      this.removeFavorite(movie.id);
    } else {
      this.addFavorite(movie.id);
    }
  }

  addFavorite(movieId: string): void {
    this.movieService.addFavorite(movieId).subscribe(
      () => {
        this.favorites.push(movieId);
        alert('Filme adicionado aos favoritos com sucesso!');
      },
      (error) => {
        console.error('Erro ao adicionar o filme aos favoritos:', error);
        alert('Erro ao adicionar o filme aos favoritos.');
      }
    );
  }

  removeFavorite(movieId: string): void {
    this.movieService.removeFavorite(movieId).subscribe(
      () => {
        this.favorites = this.favorites.filter(id => id !== movieId);
        alert('Filme removido dos favoritos com sucesso!');
      },
      (error) => {
        console.error('Erro ao remover o filme dos favoritos:', error);
        alert('Erro ao remover o filme dos favoritos.');
      }
    );
  }
}
