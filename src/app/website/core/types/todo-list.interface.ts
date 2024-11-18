export interface ITodoItem {
  id: number;
  title: string;
  status: boolean;
}

export interface getterTodoData {
  active: ITodoItem[];
  unactive: ITodoItem[];
}

export interface postTodoData {
  title: string;
  status: boolean;
}
