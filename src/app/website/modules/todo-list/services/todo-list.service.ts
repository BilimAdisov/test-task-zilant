import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/service/api.service';
import {
  getterTodoData,
  postTodoData,
} from '../../../core/types/todo-list.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor(private apiService: ApiService) {}

  getTodoList(): Observable<getterTodoData> {
    return this.apiService.get<getterTodoData>('/todo');
  }

  async createTodo(todoData: postTodoData, isSucces: any) {
    return this.apiService.post<postTodoData>('/todo', todoData).subscribe({
      next: (response) => {
        isSucces();
        return response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  async updateTodo(id: number, todoData: postTodoData, isSucces: any) {
    const data = this.apiService
      .put<postTodoData>(`/todo/${id}`, todoData)
      .subscribe({
        next: (response) => {
          isSucces();
          return response;
        },
        error: (error) => {
          console.error(error);
        },
      });
    return data;
  }

  async deleteTodo(id: number, isSucces: any) {
    const data = this.apiService.delete<number>(`/todo/${id}`).subscribe({
      next: () => {
        'succes';
        isSucces();
      },
      error(err) {
        console.error(err);
      },
    });
  }
}
