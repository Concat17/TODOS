const TodoModel = function TodoModel() {
  this.notes = [];
  this.currentIndex = 0;
};

TodoModel.prototype.addNote = function addNote() {
  const Note = function Note() {
    this.name = "Note";
    this.creation_data = "222";
    this.todos = [];
  };

  Note.prototype.addTodo = function addTodo(): void {
    const todo = {
      name: "1",
      content: "Hi",
      priority: "Low"
    };
    this.todos.push(todo);
  };
  const note = new Note();
  note.addTodo();
  this.notes.push(note);
};

TodoModel.prototype.getTodo = function getTodo(fn: (note) => void) {
  this.addNote();
  // this.addTodo(this.notes[0]);
  fn(this.notes[this.currentIndex]); // FIXME:
};

export default TodoModel;
