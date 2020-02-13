<<<<<<< HEAD
import { Component } from "../Component";
import ViewNoteName from "./ViewNoteName";
import ViewNoteDate from "./ViewNoteDate";
import ViewNoteTodos from "./ViewNoteTodos";
import Note from "../../Model/Note";
=======
import Note from '../../Model/Note';
import { Component } from '../Component';
import ViewNoteDate from './ViewNoteDate';
import ViewNoteName from './ViewNoteName';
>>>>>>> 00eff420891df522eaadde6dbf1d417c525d91e6

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

    const noteTodos = new ViewNoteTodos(this.noteData.todos);
    element.append(noteTodos.render());

    return element;
  }
}
