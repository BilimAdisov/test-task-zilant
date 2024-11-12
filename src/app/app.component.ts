import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthGuard } from '../custom-guard/auth.guard';
import { ApiService } from '../custom-services/api.service';
import { CustomCookieService } from '../custom-services/cookie.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  providers: [AuthGuard, ApiService, CustomCookieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Test task';
}
