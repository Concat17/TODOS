import Note from "../../Model/Note";
import { Component } from "../Component";
import ViewNoteDate from "./ViewNoteDate";
import ViewNoteName from "./ViewNoteName";
import ViewNoteTodos from "./ViewNoteTodos";

export default class ViewNote implements Component {
  noteData: Note;

  constructor(noteData: Note) {
    this.noteData = noteData;
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    element.className = "note";
    // element.textContent = this.myImportantData;

    const noteNameElement = new ViewNoteName(this.noteData.name);
    element.append(noteNameElement.render());

    const noteDateElement = new ViewNoteDate(this.noteData.creationDate);
    element.append(noteDateElement.render());

    const noteTodosElement = new ViewNoteTodos(this.noteData.todos);
    element.append(noteTodosElement.render());

    return element;
  }
}
