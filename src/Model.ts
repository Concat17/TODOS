const TodoModel = function TodoModel() {
  this.notes = [];
  this.currentIndex = 0;
};

TodoModel.prototype.addNote = function addNote() {
  const Note = function Note() {
    this.name = "Note";
    this.creation_data = TodoModel.prototype.getCurrentDate();
    this.todos = [];
  };

  Note.prototype.addTodo = function addTodo(): void {
    const todo = {
      name: "Todo",
      content: "Hi",
      priority: "Low"
    };
    this.todos.push(todo);
  };
  const note = new Note();
  note.addTodo();
  this.notes.push(note);
};

TodoModel.prototype.getNoteData = function getNoteData(index: number): object {
  return this.notes[index]; // FIXME:
};

TodoModel.prototype.getCurrentDate = function getCurrentDate(): string {
  const today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();

  return `${dd}.${mm}.${yyyy}`; // (today = mm + "/" + dd + "/" + yyyy);
};

export default TodoModel;
