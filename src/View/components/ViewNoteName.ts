import { Component } from "../Component";

export default class ViewNoteName implements Component {
  noteName: string;

  constructor(noteName: string) {
    this.noteName = noteName;
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    element.className = "note_name";
    element.textContent = this.noteName;
    return element;
  }
}
