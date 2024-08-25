import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports:[FormsModule, CommonModule]
})
export class SearchComponent {
  movies: any[] = [];
  query: string = '';

  constructor(private movieService: MovieService) { }

  search() {
    this.movieService.searchMovies(this.query).subscribe(data => {
      this.movies = data.results;
    });
  }

  addFavorite(movie: any) {
    this.movieService.addFavorite(movie).subscribe(() => {
      alert('Movie added to favorites');
    });
  }
}
