import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from "./componentes/search/search.component";
import { FavoritesComponent } from "./componentes/favorites/favorites.component";
import { ShareComponent } from "./componentes/share/share.component";
import { NavbarComponent } from "./componentes/navbar/navbar.component";
import { FooterComponent } from "./componentes/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, FavoritesComponent, ShareComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-app';
}
