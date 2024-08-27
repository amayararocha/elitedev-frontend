import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { MovieComponent } from './componentes/movie/movie.component';
import { FavoritesComponent } from './componentes/favorites/favorites.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'movies', component: MovieComponent },
    { path: 'home', component: HomeComponent },
    { path: 'favorite', component: FavoritesComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: '**', redirectTo: '/home' }
];
