// import TodoModel from "../Model/TodoModel";
import Note, { Todo, Priority } from "../Model/Note";

export default class TodoView {
  element: HTMLElement;
  onClickGetTodo;
  onMouseDown;

  constructor(element: HTMLElement) {
    this.element = element;

    this.onClickGetTodo = null;
    this.onMouseDown = null;
  }

  render(noteData: Note): void {
    // TODO: Generation todos via css grid
    // this.element.innerHTML = `<div id="click_button" class="note" data-index="1">
    //   <div class="note_name">${noteData.name}</div>
    //   <div class="note_todos">${this.generateTodos(noteData)}<div>
    //   </div>`;

    // const clickButton: HTMLElement = this.element.querySelector(
    //   "#click_button"
    // );
    // clickButton.addEventListener("click", this.onClickGetTodo);
    // clickButton.addEventListener("mousedown", this.onMouseDown);

    const note = this.createNote(noteData);
    this.element.append(note);
  }

  createNote = (data: Note): HTMLElement => {
    const note = document.createElement("div");
    note.className = "note";

    const noteName = document.createElement("div");
    noteName.className = "note_name";
    noteName.innerText = data.name;

    const noteDate = document.createElement("div");
    noteDate.className = "note_date";
    noteDate.innerText = data.creationDate;

    const noteTodos = this.createTodos(data);

    note.append(noteName);
    note.append(noteDate);
    note.append(noteTodos);

    note.addEventListener("mousedown", this.onMouseDown);
    return note;
  };

  createTodos(data: Note): HTMLElement {
    const noteTodos = document.createElement("div");
    noteTodos.className = "note_todos";
    data.todos.forEach(todo => noteTodos.append(this.todoToHtml(todo)));
    return noteTodos;
  }

  todoToHtml = (todoData: Todo): HTMLElement => {
    const todo = document.createElement("div");
    todo.className = "todo";
    if (todoData.priority === Priority.Low) {
      todo.style.backgroundColor = "yellow";
    } else if (todoData.priority === Priority.Normal) {
      todo.style.backgroundColor = "green";
    } else {
      todo.style.backgroundColor = "red";
    }

    const todoName = document.createElement("div");
    todoName.className = "todo_name";
    todoName.innerText = todoData.name;

    const todoContent = document.createElement("div");
    todoContent.className = "todo_content";
    todoContent.innerText = todoData.content;

    todo.append(todoName);
    todo.append(todoContent);
    return todo;
  };

  MoveNote = (e): Event => {
    const note = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (note.className !== "note") return;
    const shiftX = e.clientX - note.getBoundingClientRect().left;
    const shiftY = e.clientY - note.getBoundingClientRect().top;
    note.style.position = "absolute";
    note.style.zIndex = "1000";
    document.body.append(note);

    function moveAt(pageX: number, pageY: number): void {
      note.style.left = `${pageX - shiftX}px`;
      note.style.top = `${pageY - shiftY}px`;
    }
    moveAt(e.pageX, e.pageY);

    function onMouseMove(event: MouseEvent): void {
      moveAt(event.pageX, event.pageY);
    }
    document.addEventListener("mousemove", onMouseMove);

    note.onmouseup = function onMouseUp(): void {
      document.removeEventListener("mousemove", onMouseMove);
      note.onmouseup = null;
    };
  };
}
