import { Component } from "../Component";

export default class ViewTodoName implements Component {
  todoName: string;

  constructor(todoName: string) {
    this.todoName = todoName;
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    element.className = "todo_name";
    element.textContent = this.todoName;
    return element;
  }
}
