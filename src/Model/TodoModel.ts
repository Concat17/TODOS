import Note from './Note';

export default class TodoModel {
  notes: Note[];
  currentIndex: number;

  constructor() {
    this.notes = [];
    this.currentIndex = 0;
  }

  addNote() {
    const note = new Note();
    note.addTodo();
    note.addTodo();
    note.addTodo();
    this.notes.push(note);
  }

  getNoteData(index: number): object {
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
