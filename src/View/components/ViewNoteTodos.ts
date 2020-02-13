import { Component } from "../Component";
import { Todo } from "../../Model/Note";
import ViewTodo from "./ViewTodo";
import ViewTodoAddButton from "./ViewTodoAddButton";

export default class ViewNoteTodos implements Component {
  noteTodos: Todo[];

  constructor(noteTodos: Todo[]) {
    this.noteTodos = noteTodos;
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    element.className = "note_todos";

    this.noteTodos.forEach(todo => element.append(new ViewTodo(todo).render()));

    const addButton = new ViewTodoAddButton();
    element.append(addButton.render());

    return element;
  }
}
