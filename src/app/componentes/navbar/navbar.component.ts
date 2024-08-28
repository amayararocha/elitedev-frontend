import { Component, OnInit } from '@angular/core';
import { LoginResponse, UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  login(username: string, password: string): void {
    this.userService.login(username, password).subscribe(
      (response: LoginResponse) => {
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  logout(): void {
    this.userService.logout();
  }
}
