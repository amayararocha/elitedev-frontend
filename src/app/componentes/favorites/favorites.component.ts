import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorites.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.movieService.getFavorites().subscribe(
      (favorites: any[]) => {
        this.favorites = favorites;
      },
      (error) => {
        console.error('Error loading favorites:', error);
      }
    );
  }

  redirectToMovies(): void {
    this.router.navigate(['/movies']);
  }

  removeFavorite(movieId: string): void {
    if (confirm('Are you sure you want to remove this movie from favorites?')) {
      this.movieService.removeFavorite(movieId).subscribe(
        () => {
          this.favorites = this.favorites.filter(movie => movie.id !== movieId);
          alert('Movie removed from favorites successfully!');
        },
        (error) => {
          console.error('Error removing movie from favorites:', error);
          alert('Error removing movie from favorites.');
        }
      );
    }
  }
}
