import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // LOGIN PAGE ALWAYS ACCESSIBLE
    if (route.routeConfig?.path === 'login') {
      return true;
    }

    // PROTECT OTHER ROUTES
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
