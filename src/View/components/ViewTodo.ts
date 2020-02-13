import { Component } from "../Component";
import { Todo, Priority } from "../../Model/Note";
import ViewTodoName from "./ViewTodoName";
import ViewTodoContent from "./ViewTodoContent";

export default class ViewTodo implements Component {
  todoData: Todo;

  constructor(todoData: Todo) {
    this.todoData = todoData;
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    element.className = "todo";
    element.id = this.todoData.id.toString();
    element.style.backgroundColor = this.SetTodoColor(this.todoData.priority);

    const todoNameElement = new ViewTodoName(this.todoData.name);
    element.append(todoNameElement.render());

    const todoContentElement = new ViewTodoContent(this.todoData.content);
    element.append(todoContentElement.render());

    return element;
  }

  SetTodoColor = (priority: Priority): string => {
    switch (priority) {
      case Priority.Normal:
        return "green";
      case Priority.High:
        return "red";
      default:
        return "yellow";
    }
  };
}
