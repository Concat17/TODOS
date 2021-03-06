import TodoModel from "../Model/TodoModel";
import TodoView from "../View/View";
import Note from "../Model/Note";

export default class TodoController {
  model: TodoModel;
  view: TodoView;

  constructor(model: TodoModel, view: TodoView) {
    this.model = model;
    this.view = view;
  }

  initialize(): void {
    this.view.onMouseDown = this.onMouseDown.bind(this);
    this.view.onClickSaveButton = this.onClickSaveButton.bind(this);
    this.addNote();
    document.addEventListener("click", this.onClickEmptyArea);
  }

  onMouseDown(e: MouseEvent): void {
    this.view.MoveNote(e);
  }

  onClickSaveButton = (e: MouseEvent): void => {
    const editableTodoId = this.view.GetEditableId();
    const target = e.currentTarget as HTMLElement;
    const editableNoteId = parseInt(target.parentElement.parentElement.id, 10);
    const editableNoteData = this.model.getNoteData(editableNoteId);
    const name = this.view.GetEditableText("editable_name");
    const content = this.view.GetEditableText("editable_content");
    if (editableTodoId === "") {
      editableNoteData.addTodo();
      editableNoteData.editTodo(editableNoteData.lastTodoId - 1, name, content);
    } else {
      editableNoteData.editTodo(parseInt(editableTodoId, 10), name, content);
    }

    this.showNotes(this.model.notes);
  };

  onClickEmptyArea = (e: MouseEvent): void => {
    const t = e.target as HTMLElement;
    if (t.nodeName === "HTML") {
      const isAddNewNote = confirm("Create new node?");
      if (isAddNewNote) {
        this.addNote();
      }
    }
  };

  showNotes(notesData: Note[]): void {
    this.view.render(notesData);
  }

  static start = (): void => {
    const todoModel = new TodoModel();

    const targetElement = document.getElementById("notes");
    const todoView = new TodoView(targetElement);

    const controller = new TodoController(todoModel, todoView);

    controller.initialize();
  };

  addNote(): void {
    this.model.addNote();
    const lastNoteId = this.model.getLastNoteId();
    this.view.addNotePlace(lastNoteId.toString());
    this.showNotes(this.model.notes);
  }
}
