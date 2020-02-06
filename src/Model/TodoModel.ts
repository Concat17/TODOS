import Note from "./Note";

export default class TodoModel {
  notes: Note[];
  currentIndex: number;
  lastNoteId: number;

  constructor() {
    this.notes = [];
    this.currentIndex = 0;
    this.lastNoteId = 0;
  }

  addNote(): void {
    const note = new Note(this.lastNoteId);
    note.addTodo();
    note.addTodo();
    note.addTodo();
    this.notes.push(note);

    this.lastNoteId += 1;
  }

  getNoteData(index: number): Note {
    return this.notes[index];
  }

  // this method doesn't use this so it must me static (or global - it's prefered)
  static getCurrentDate(): string {
    const today = new Date();
    const dd = today.getDate().toString(); // it's better to use toString() method (looks better)
    const mm = (today.getMonth() + 1).toString();
    const yyyy = today.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
  }
}
