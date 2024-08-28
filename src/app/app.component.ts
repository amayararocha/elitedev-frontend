import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from "./componentes/footer/footer.component";
import { NavbarComponent } from './componentes/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
