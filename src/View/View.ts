// import TodoModel from "../Model/TodoModel";
import Note from "../Model/Note";
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

  render(notesData: Note[]): void {
    notesData.forEach(note => this.renderNote(note));
  }

  renderNote(noteData: Note): void {
    const note = new ViewNote(noteData);
    const renderedNote = note.render();
    const todosCollection = renderedNote.getElementsByClassName("todo");
    const todosArray = [...todosCollection];

    todosArray.forEach(todo =>
      todo.addEventListener("click", this.MakeEditable)
    );
    const todoAddButton = renderedNote.getElementsByClassName("add_todo")[0];
    todoAddButton.addEventListener("click", this.MakeEditable);
    renderedNote.addEventListener("mousedown", this.MoveNote);

    const place = document.getElementById(`note_place_${renderedNote.id}`);
    place.childNodes.forEach(elem => elem.remove());
    place.append(renderedNote);
  }

  addNotePlace = (id: string): void => {
    const notePlace = document.createElement("div");
    notePlace.className = "note_place";
    notePlace.id = `note_place_${id}`;
    document.body.appendChild(notePlace);
  };

  createElementAndSetClass = (
    tagName: string,
    className: string
  ): HTMLElement => {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
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

  MoveNote = (e: MouseEvent): void => {
    const clickedElement = document.elementFromPoint(
      e.clientX,
      e.clientY
    ) as HTMLElement;
    const note = clickedElement.closest(".note_place") as HTMLElement;

    const shiftX = e.clientX - note.getBoundingClientRect().left;
    const shiftY = e.clientY - note.getBoundingClientRect().top;
    note.style.position = "absolute";
    note.style.zIndex = "1000";

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
      note.style.zIndex = "1";
      note.onmouseup = null;
    };
  };
}
