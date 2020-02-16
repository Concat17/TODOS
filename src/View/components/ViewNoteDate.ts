import { Component } from "../Component";

export default class ViewNoteDate implements Component {
  noteDate = "New Todo";

  constructor(noteDate: string) {
    this.noteDate = noteDate;
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    element.className = "note_date";
    element.textContent = this.noteDate;
    return element;
  }
}
