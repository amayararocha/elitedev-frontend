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
  favorites: Set<number> = new Set(); // Armazena IDs dos filmes favoritos

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
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

  addToFavorites(movie: any): void {
    if (this.favorites.has(movie.id)) {
      this.favorites.delete(movie.id);
    } else {
      this.favorites.add(movie.id);
    }
  }

  isFavorite(movieId: number): boolean {
    return this.favorites.has(movieId);
  }

  formatCategory(category: string): string {
    return category.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
}
