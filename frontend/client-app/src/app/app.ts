import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.html',
})
export class App {

   constructor(private router: Router) {}
  isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}


isLoginPage() {
    return this.router.url === '/login';
  }
}
