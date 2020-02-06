import TodoModel from "./TodoModel";

export enum Priority {
  Low,
  Normal,
  High
}

export interface Todo {
  id: number;
  name: string;
  content: string;
  priority: Priority;
}

export default class Note {
  id: number;
  lastTodoId: number;
  name: string;
  creationDate: string;
  todos: Todo[];

  constructor(id: number) {
    this.id = id;
    this.name = "Note";
    this.creationDate = TodoModel.getCurrentDate();
    this.todos = [];
    this.lastTodoId = 0;
  }

  addTodo(): void {
    const todo: Todo = {
      id: this.lastTodoId,
      name: "Todo",
      content: "Hi",
      priority: Priority.Low
    };
    this.lastTodoId += 1;

    this.todos.push(todo);
  }

  editTodo(id: number, name: string, content: string): void {
    this.todos[id].name = name;
    this.todos[id].content = content;
  }
}
