import Note from "./Note";

export default class TodoModel {
  notes: Note[];
  currentIndex: number;
  lastNoteId: number;

  constructor() {
    this.notes = [];
    this.currentIndex = 0;
    this.lastNoteId = -1;
  }

  addNote(): void {
    this.lastNoteId += 1;
    const note = new Note(this.lastNoteId);
    note.addTodo();
    note.addTodo();
    this.notes.push(note);
  }

  getNoteData(index: number): Note {
    return this.notes[index];
  }

  getNotes(): Note[] {
    return this.notes;
  }

  getLastNoteId(): number {
    return this.lastNoteId;
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
