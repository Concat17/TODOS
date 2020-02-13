// import TodoModel from "../Model/TodoModel";
import Note, { Priority, Todo } from "../Model/Note";
import ViewNote from "./components/ViewNote";

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
    // const note = this.placeNote(noteData);
    const note = new ViewNote(noteData);
    const renderedNote = note.render();
    const todosCollection = renderedNote.getElementsByClassName("todo");
    const todosArray = [...todosCollection];
    todosArray.forEach(todo =>
      todo.addEventListener("click", this.MakeEditable)
    );

    this.element.append(renderedNote);
  }

  createElementAndSetClass = (
    tagName: string,
    className: string
  ): HTMLElement => {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
  };

  placeNote = (noteData: Note): HTMLElement => {
    const note = this.createElementAndSetClass("div", "note");
    note.id = noteData.id.toString();

    const noteName = this.createElementAndSetClass("div", "note_name");
    noteName.innerText = noteData.name;

    const noteDate = this.createElementAndSetClass("div", "note_date");
    noteDate.innerText = noteData.creationDate;

    const noteTodos = this.placeTodos(noteData);

    const addTodo = this.PlaceAddTodoButton();
    noteTodos.append(addTodo);

    note.append(noteName);
    note.append(noteDate);
    note.append(noteTodos);

    note.addEventListener("mousedown", this.onMouseDown);
    return note;
  };

  placeTodos(noteData: Note): HTMLElement {
    const noteTodos = this.createElementAndSetClass("div", "note_todos");
    noteData.todos.forEach(todo => noteTodos.append(this.todoToHtml(todo)));
    return noteTodos;
  }

  todoToHtml = (todoData: Todo): HTMLElement => {
    const todo = this.createElementAndSetClass("div", "todo");
    todo.id = todoData.id.toString();

    if (todoData.priority === Priority.Low) {
      todo.style.backgroundColor = "yellow";
    } else if (todoData.priority === Priority.Normal) {
      todo.style.backgroundColor = "green";
    } else {
      todo.style.backgroundColor = "red";
    }

    const todoName = this.createElementAndSetClass("div", "todo_name");
    todoName.innerText = todoData.name;

    const todoContent = this.createElementAndSetClass("p", "todo_content");
    todoContent.innerHTML = todoData.content;

    todo.append(todoName);
    todo.append(todoContent);

    todo.addEventListener("click", this.MakeEditable);
    return todo;
  };

  MakeEditable = (e: MouseEvent): void => {
    // only one editable todo at time
    this.RemoveEditable();

    const todo = e.target as HTMLElement;

    const editableName = this.createElementAndSetClass(
      "input",
      "editable_name"
    ) as HTMLInputElement;
    editableName.value = todo.parentElement.firstChild.textContent;

    const editableContent = this.createElementAndSetClass(
      "input",
      "editable_content"
    ) as HTMLInputElement;
    editableContent.value = todo.parentElement.lastChild.textContent;

    const saveButton = this.createElementAndSetClass("button", "button_save");
    saveButton.innerText = "Save";
    saveButton.addEventListener("click", this.onClickSaveButton);

    todo.parentElement.after(saveButton);
    todo.parentElement.after(editableContent);
    todo.parentElement.after(editableName);

    this.editable = todo.parentElement;
    todo.parentElement.remove();
  };

  GetEditableId(): string {
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

  PlaceAddTodoButton = (): HTMLElement => {
    const addTodo = this.createElementAndSetClass("div", "todo");

    const todoContent = this.createElementAndSetClass("p", "todo_content");
    todoContent.innerHTML = "+";

    addTodo.append(todoContent);
    addTodo.addEventListener("click", this.MakeEditable);
    return addTodo;
  };

  // TODO: Set text to new todo and fix bug then click another todo without saving
  ExpandAddButton = (e: MouseEvent): void => {
    const button = e.currentTarget as HTMLElement;
    const todoName = this.createElementAndSetClass("div", "todo_name");
    todoName.innerText = "New todo";
    button.prepend(todoName);
    this.MakeEditable(e);
  };

  // SqueezeAddButton = (): void => {};

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
