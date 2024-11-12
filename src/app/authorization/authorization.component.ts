import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomCookieService } from '../../custom-services/cookie.service';
import { Router } from '@angular/router';
import { ApiService } from '../../custom-services/api.service';

export interface IUserdata {
  id: number;
  name: string;
  username: string;
  role: string;
  token: string;
}

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent implements OnInit {
  authForm: FormGroup;
  userData: IUserdata | undefined = undefined;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private cookieService: CustomCookieService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}
  onSubmit() {
    if (this.authForm.valid) {
      const authData = {
        username: this.authForm.value.username,
        password: this.authForm.value.password,
      };

      this.apiService.post<IUserdata>('/auth/login', authData).subscribe({
        next: (response) => {
          this.cookieService.setCookie('token', response.token);
          this.cookieService.setCookie('userName', response.name);
          this.cookieService.setCookie('userRole', response.role);
          this.userData = response;
          this.router.navigate(['/dashboard']);
          console.log(this.userData);
        },
        error: (error) => {
          console.error('Ошибка авторизации', error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
