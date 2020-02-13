import { Component } from "../Component";
import ViewNoteName from "./ViewNoteName";
import ViewNoteDate from "./ViewNoteDate";
import ViewNoteTodos from "./ViewNoteTodos";
import Note from "../../Model/Note";

export default class ViewNote implements Component {
  noteData: Note;

  constructor(noteData: Note) {
    this.noteData = noteData;
  }

  render(): HTMLElement {
    const element = document.createElement("div");
    element.className = "note";
    // element.textContent = this.myImportantData;

    const noteName = new ViewNoteName(this.noteData.name);
    element.append(noteName.render());

    const noteDate = new ViewNoteDate(this.noteData.creationDate);
    element.append(noteDate.render());

    const noteTodos = new ViewNoteTodos(this.noteData.todos);
    element.append(noteTodos.render());

    return element;
  }
}
