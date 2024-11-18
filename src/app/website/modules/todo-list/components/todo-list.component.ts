import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import { getterTodoData } from '../../../core/types/todo-list.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  constructor(private todoService: TodoListService) {}
  newTaskTitle: string = '';
  getTodoList: getterTodoData = { active: [], unactive: [] };

  ngOnInit(): void {
    this.fetchTodoList();
  }

  fetchTodoList(): void {
    this.todoService.getTodoList().subscribe({
      next: (data) => {
        this.getTodoList = data;
      },
      error: (err) => {
        console.error('Ошибка при загрузке списка задач:', err);
      },
    });
  }

  addTask() {
    this.todoService
      .createTodo(
        {
          title: this.newTaskTitle,
          status: true,
        },
        this.fetchTodoList()
      )
      .then(() => {
        this.newTaskTitle = '';
      });
  }

  updateTask(id: number, status: boolean, title: string) {
    this.todoService
      .updateTodo(
        id,
        {
          title,
          status,
        },
        this.fetchTodoList()
      )
      .then(() => {
        this.newTaskTitle = '';
      });
  }

  deleteTask(id: number) {
    this.todoService.deleteTodo(id, this.fetchTodoList());
  }
}
