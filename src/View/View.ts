// import TodoModel from "../Model/TodoModel";
import Note, { Todo, Priority } from "../Model/Note";

export default class TodoView {
  element: HTMLElement;
  editable;
  onClickGetTodo;
  onMouseDown;
  onClickSaveButton;

  constructor(element: HTMLElement) {
    this.element = element;

    this.onClickGetTodo = null;
    this.onMouseDown = null;
    this.onClickSaveButton = null;
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

    const note = this.placeNote(noteData);
    this.element.append(note);
  }

  createElementSetClass = (tagName: string, className: string): HTMLElement => {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
  };

  placeNote = (noteData: Note): HTMLElement => {
    const note = this.createElementSetClass("div", "note");
    note.id = noteData.id.toString();

    const noteName = this.createElementSetClass("div", "note_name");
    noteName.innerText = noteData.name;

    const noteDate = this.createElementSetClass("div", "note_date");
    noteDate.innerText = noteData.creationDate;

    const noteTodos = this.placeTodos(noteData);

    note.append(noteName);
    note.append(noteDate);
    note.append(noteTodos);

    note.addEventListener("mousedown", this.onMouseDown);
    return note;
  };

  placeTodos(noteData: Note): HTMLElement {
    const noteTodos = this.createElementSetClass("div", "note_todos");
    noteData.todos.forEach(todo => noteTodos.append(this.todoToHtml(todo)));
    return noteTodos;
  }

  todoToHtml = (todoData: Todo): HTMLElement => {
    const todo = this.createElementSetClass("div", "todo");
    todo.id = todoData.id.toString();

    if (todoData.priority === Priority.Low) {
      todo.style.backgroundColor = "yellow";
    } else if (todoData.priority === Priority.Normal) {
      todo.style.backgroundColor = "green";
    } else {
      todo.style.backgroundColor = "red";
    }

    const todoName = this.createElementSetClass("div", "todo_name");
    todoName.innerText = todoData.name;

    const todoContent = this.createElementSetClass("div", "todo_content");
    todoContent.innerText = todoData.content;

    todo.append(todoName);
    todo.append(todoContent);

    todo.addEventListener("click", this.MakeEditable);
    return todo;
  };

  MakeEditable = (e: MouseEvent): void => {
    // only one editable todo at time
    this.RemoveEditable();

    const todo = e.target as HTMLElement;

    const editableName = this.createElementSetClass(
      "input",
      "editable_name"
    ) as HTMLInputElement;
    editableName.value = todo.parentElement.firstChild.textContent;

    const editableContent = this.createElementSetClass(
      "input",
      "editable_content"
    ) as HTMLInputElement;
    editableContent.value = todo.parentElement.lastChild.textContent;

    const saveButton = this.createElementSetClass("button", "button_save");
    saveButton.innerText = "Save";
    saveButton.addEventListener("click", this.onClickSaveButton);

    todo.parentElement.after(saveButton);
    todo.parentElement.after(editableContent);
    todo.parentElement.after(editableName);

    this.editable = todo.parentElement;
    todo.parentElement.remove();
  };

  GetEditableId(): number {
    return this.editable.id;
  }

  GetEditableText = (className: string): string => {
    const editableText = document.getElementsByClassName(
      className
    )[0] as HTMLInputElement;
    return editableText.value;
  };

  RemoveEditable = (): void => {
    const editableName = document.getElementsByClassName("editable_name");
    if (editableName.length === 0) return;

    const editableContent = document.getElementsByClassName("editable_content");
    const saveButton = document.getElementsByClassName("button_save");
    saveButton[0].after(this.editable);

    saveButton[0].remove();
    editableName[0].remove();
    editableContent[0].remove();
  };

  MoveNote = (e: MouseEvent): void => {
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
