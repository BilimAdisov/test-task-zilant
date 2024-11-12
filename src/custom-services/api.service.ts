import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomCookieService } from './cookie.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private cookieService: CustomCookieService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.getCookie('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    const headers = this.getHeaders();
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      headers,
      params: httpParams,
    });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }

  delete<T>(endpoint: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { headers });
  }

  patch<T>(endpoint: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, data, { headers });
  }
}
