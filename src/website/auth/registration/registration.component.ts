import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUserdata } from '../authorization/authorization.component';
import { ApiService } from '../../../custom-services/api.service';
import { CustomCookieService } from '../../../custom-services/cookie.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  userData: IUserdata | undefined = undefined;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private cookieService: CustomCookieService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      patronymic: [''],
    });
  }
  ngOnInit(): void {}
  onRegister() {
    if (this.registerForm.valid) {
      const authData = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        name: this.registerForm.value.name,
        surname: this.registerForm.value.surname,
        patronymic: this.registerForm.value.patronymic,
      };

      this.apiService
        .post<IUserdata>('/auth/registration', authData)
        .subscribe({
          next: (response) => {
            this.cookieService.setCookie('token', response.token);
            this.cookieService.setCookie('userName', response.name);
            this.cookieService.setCookie('userRole', response.role);
            this.userData = response;
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
