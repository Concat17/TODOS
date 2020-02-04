import TodoModel from "./TodoModel";

enum Priority {
  Low,
  Normal,
  High
}

export interface Todo {
  name: string;
  content: string;
  priority: Priority;
}

export default class Note {
  name: string;
  creationDate: string;
  todos: Todo[];

  constructor() {
    this.name = "Note";
    this.creationDate = TodoModel.getCurrentDate();
    this.todos = [];
  }

  addTodo(): void {
    const todo: Todo = {
      name: "Todo",
      content: "Hi",
      priority: Priority.Low
    };

    this.todos.push(todo);
  }
}
