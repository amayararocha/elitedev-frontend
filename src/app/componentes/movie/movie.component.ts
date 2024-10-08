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
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;
  favorites: string[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadFavorites(); 
  }

  loadMovies(): void {
    switch (this.selectedCategory) {
      case 'popular':
        this.movieService.getPopularMovies(this.currentPage).subscribe(data => this.handleResponse(data));
        break;
      case 'top_rated':
        this.movieService.getTopRatedMovies(this.currentPage).subscribe(data => this.handleResponse(data));
        break;
      case 'upcoming':
        this.movieService.getUpcomingMovies(this.currentPage).subscribe(data => this.handleResponse(data));
        break;
    }
  }

  searchMovies(): void {
    if (this.searchQuery) {
      this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe(data => this.handleResponse(data));
    } else {
      this.loadMovies();
    }
  }

  handleResponse(data: any): void {
    this.movies = data.results;
    this.totalPages = data.total_pages; 
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
        this.updateFavoriteStates();
      },
      (error) => {
        console.error('Error loading favorites:', error);
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
        alert('Movie added to favorites successfully!');
        this.updateFavoriteStates();  
      },
      (error) => {
        console.error('Error adding movie to favorites:', error);
        alert('Error adding movie to favorites.');
      }
    );
  }

  removeFavorite(movieId: string): void {
    this.movieService.removeFavorite(movieId).subscribe(
      () => {
        this.favorites = this.favorites.filter(id => id !== movieId);
        alert('Movie removed from favorites successfully!');
        this.updateFavoriteStates();  
      },
      (error) => {
        console.error('Error removing movie from favorites:', error);
        alert('Error removing movie from favorites.');
      }
    );
  }

  updateFavoriteStates(): void {
    this.filteredMovies = this.filteredMovies.map(movie => ({
      ...movie,
      isFavorite: this.isFavorite(movie.id)
    }));
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies();
    }
  }
}
