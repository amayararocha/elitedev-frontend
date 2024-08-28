import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorites.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  paginatedFavorites: any[] = [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 20; 

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.movieService.getFavorites().subscribe(
      (favorites: any[]) => {
        this.favorites = favorites;
        this.totalPages = Math.ceil(this.favorites.length / this.itemsPerPage);
        this.updatePaginatedFavorites();
      },
      (error) => {
        console.error('Error loading favorites:', error);
      }
    );
  }

  updatePaginatedFavorites(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedFavorites = this.favorites.slice(start, end);
  }

  redirectToMovies(): void {
    this.router.navigate(['/movies']);
  }

  removeFavorite(movieId: string): void {
    if (confirm('Are you sure you want to remove this movie from favorites?')) {
      this.movieService.removeFavorite(movieId).subscribe(
        () => {
          this.favorites = this.favorites.filter(movie => movie.id !== movieId);
          this.totalPages = Math.ceil(this.favorites.length / this.itemsPerPage);
          this.updatePaginatedFavorites();
          alert('Movie removed from favorites successfully!');
        },
        (error) => {
          console.error('Error removing movie from favorites:', error);
          alert('Error removing movie from favorites.');
        }
      );
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedFavorites();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedFavorites();
    }
  }
}
