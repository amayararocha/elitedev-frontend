import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class RegisterComponent {
  registerData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.register(this.registerData.username, this.registerData.email, this.registerData.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error while registering', error);
      }
    );
  }
}
