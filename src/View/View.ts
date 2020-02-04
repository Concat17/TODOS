// import TodoModel from "../Model/TodoModel";
import Note from "../Model/Note";

export default class TodoView {
  element: HTMLElement;
  onClickGetTodo;
  onMouseDown;

  constructor(element: HTMLElement) {
    this.element = element;

    this.onClickGetTodo = null;
    this.onMouseDown = null;
  }

  render(todoData: Note): void {
    // TODO: Generation todos via css grid
    this.element.innerHTML = `<div id="click_button" class="note" data-index="1">
      <div class="note_name">${todoData.name}</div>
      <div class="note_todos">${this.generateTodos(todoData)}<div> 
      </div>`;

    const clickButton: HTMLElement = this.element.querySelector(
      "#click_button"
    );
    clickButton.addEventListener("click", this.onClickGetTodo);
    clickButton.addEventListener("mousedown", this.onMouseDown);
  }

  generateTodos(note: Note): string {
    return note.todos.reduce((acc, todo) => acc + this.todoToHtml(todo), "");
  }

  todoToHtml = (todo): string => {
    return `<div class="todo_name">${todo.name}</div>`;
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
