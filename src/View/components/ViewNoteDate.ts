import { Component } from "../Component";

export default class ViewNoteName implements Component {
  noteDate = "New Todo";

  constructor(noteDate: string) {
    this.noteDate = noteDate;
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    // TODO: add css note_name class
    // element.className = "note_name";

    element.textContent = this.noteDate;

    return element;
  }
}
