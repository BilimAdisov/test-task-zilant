import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../custom-services/api.service';
import { CommonModule } from '@angular/common';

interface IData {
  label: string;
  value: number;
  url?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
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
