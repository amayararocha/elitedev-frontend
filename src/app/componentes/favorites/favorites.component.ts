// favorites.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private movieService : MovieService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.movieService.getFavorites().subscribe(data => {
      this.favorites = data;
    });
  }
}
