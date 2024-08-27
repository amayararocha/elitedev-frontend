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
        // Armazenar o token ou qualquer outra informação necessária
        localStorage.setItem('token', response.token);

        // Redirecionar para a página de filmes
        this.router.navigate(['/movies']);
      },
      error => {
        console.error('Login failed', error);
        // Adicionar lógica de tratamento de erro, como mostrar uma mensagem ao usuário
      }
    );
  }
}
