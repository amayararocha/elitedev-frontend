import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService.login(this.loginData.username, this.loginData.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/movies']);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
