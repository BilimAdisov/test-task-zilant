import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CustomCookieService } from '../custom-services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookieService: CustomCookieService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.cookieService.checkCookie('token')) {
      return true;
    }
    this.router.navigate(['/authorization']);
    return false;
  }
}
