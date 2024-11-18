import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthGuard } from './website/core/guards/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Test task';

  state: null | {
    name: string;
    position: string;
    age: number;
    id: number;
  } = null;

  employees = [
    { name: 'Nicky', position: 'Frontend Developer', age: 25, id: 1 },
    { name: 'Franko', position: 'Backend Developer', age: 32, id: 2 },
    { name: 'Samantha', position: 'UI/UX Designer', age: 21, id: 3 },
  ];

  constructor() {}
}
