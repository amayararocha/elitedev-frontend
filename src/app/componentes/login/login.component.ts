// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.loginData).subscribe(
      (response) => {
        // Armazene o token ou qualquer outra lógica necessária
        localStorage.setItem('token', response.token);

        // Redirecionar para a página de filmes
        this.router.navigate(['/movies']);
      },
      (error) => {
        console.error('Erro ao fazer login', error);
      }
    );
  }
}
