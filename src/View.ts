const TodoView = function TodoView(element) {
  this.element = element;

  this.onClickGetTodo = null;
  this.onMouseDown = null;
};

TodoView.prototype.render = function render(todoData) {
  // TODO: Generation todos via css grid
  this.element.innerHTML = `<div id="click_button" class="note" data-index="1">
  <div class="note_name">${todoData.name}</div>
  <div class="note_todos">${this.generateTodos(todoData.todos)}<div> 
  </div>`;

  const clickButton = this.element.querySelector("#click_button");
  clickButton.addEventListener("click", this.onClickGetTodo);
  clickButton.addEventListener("mousedown", this.onMouseDown);
  clickButton.style.background = todoData.color;
};

TodoView.prototype.generateTodos = function generateTodos(todos): string {
  let res = "";
  for (let todo of todos) {
    res += this.todoToHtml(todo);
  }
  return res;
  // FIXME: return todos.reduce((t1, t2) => this.todoToHtml(t2) + this.todoToHtml(t2));
};

TodoView.prototype.todoToHtml = function todoToHtml(todo): string {
  return `<div class="todo_name">${todo.name}</div>`;
};
// TODO: Add addNote method

TodoView.prototype.MoveNote = function MoveNote(e) {
  // FIXME:
  const note = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
  if (note.className !== "note") return;
  const shiftX = e.clientX - note.getBoundingClientRect().left;
  const shiftY = e.clientY - note.getBoundingClientRect().top;
  note.style.position = "absolute";
  note.style.zIndex = "1000";
  document.body.append(note);

  function moveAt(pageX: number, pageY: number) {
    note.style.left = `${pageX - shiftX}px`;
    note.style.top = `${pageY - shiftY}px`;
  }
  moveAt(e.pageX, e.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  document.addEventListener("mousemove", onMouseMove);

  note.onmouseup = function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    note.onmouseup = null;
  };
};

export default TodoView;
