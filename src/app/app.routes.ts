import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { FavoritesComponent } from './componentes/favorites/favorites.component';
import { MovieDetailsComponent } from './componentes/movie-details/movie-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'favorites', component: FavoritesComponent},
    { path: 'movie-details', component: MovieDetailsComponent },
];
