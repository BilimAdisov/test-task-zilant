import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CustomCookieService {
  constructor(private cookieService: CookieService) {}

  setCookie(name: string, value: string, expirationDays: number = 1) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    this.cookieService.set(name, value, expirationDate);
  }

  getCookie(name: string): string {
    try {
      return this.cookieService.get(name);
    } catch (error) {
      console.error('Error retrieving cookie empty: ', error);
      return 'Пусто';
    }
  }

  checkCookie(name: string): boolean {
    return this.cookieService.check(name);
  }

  deleteCookie(name: string) {
    this.cookieService.delete(name);
  }

  deleteAllCookies() {
    this.cookieService.deleteAll();
  }

  getAllCookies(): { [key: string]: string } {
    return this.cookieService.getAll();
  }
}
