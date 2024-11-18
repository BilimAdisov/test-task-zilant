import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/service/api.service';
import { HttpClientModule } from '@angular/common/http';

interface IData {
  label: string;
  value: number;
  url?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  dataUsers: IData[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.apiService.get<IData[]>('/client/simple').subscribe({
      next: (response) => {
        this.dataUsers = response;
        console.log(this.dataUsers);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });
  }
}
