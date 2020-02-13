import { Component } from "../Component";

export default class ViewTodoContent implements Component {
  noteContent: string;

  constructor(noteContent: string) {
    this.noteContent = noteContent;
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    element.className = "todo_content";

    element.textContent = this.noteContent;

    return element;
  }
}
