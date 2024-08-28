import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  login(username: string, password: string): void {
    this.userService.login(username, password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.checkLoginStatus(); // Atualiza o estado após o login
        this.cdr.detectChanges(); // Força a atualização do DOM
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.checkLoginStatus(); // Atualiza o estado após o logout
    this.cdr.detectChanges(); // Força a atualização do DOM
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Verifica se há um token no localStorage
  }
}
