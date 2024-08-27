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
      (favorites: string[]) => {
        this.favorites = favorites;
      },
      (error) => {
        console.error('Erro ao carregar os favoritos:', error);
      }
    );
  }

  redirectToMovies(): void {
    this.router.navigate(['/movies']);
  }
}
