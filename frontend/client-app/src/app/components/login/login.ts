import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username = '';
  password = '';
  error = false;

  constructor(private router: Router) {}

  login() {
    if (this.username === 'Soumyajit' && this.password === 'Soumya@1234') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/clients']);
    } else {
      this.error = true;
      setTimeout(() => this.error = false, 600);
    }
  }
}
