import { Component } from "../Component";
import { Todo } from "../../Model/Note";

export default class ViewTodo implements Component {
  todoData: Todo;

  constructor(todoData: Todo) {
    this.todoData = todoData;
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    element.className = "todo";

    element.textContent = this.todoData.name;

    return element;
  }
}
