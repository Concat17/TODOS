import TodoModel from './TodoModel';

interface Todo {
  name: string;
  content: string;
  priority: string; // TODO: rewrite as enum
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
      priority: "Low" // TODO: rewrite as enum
    };

    this.todos.push(todo);
  }
}
