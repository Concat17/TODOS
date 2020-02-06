import TodoModel from "../Model/TodoModel";
import TodoView from "../View/View";

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
    this.model.addNote();
    const note = this.model.getNoteData(0);
    this.showTodo(note);
  }
  onMouseDown(e: MouseEvent): void {
    this.view.MoveNote(e);
  }

  onClickSaveButton = (): void => {
    const editableTodoId = this.view.GetCurrentEditableId();
    const editableNoteId = 0; // FIXME: make for several notes

    const editableNoteData = this.model.getNoteData(editableNoteId);
    const name = this.view.GetEditableText("editable_name");
    const content = this.view.GetEditableText("editable_content");

    editableNoteData.editTodo(editableTodoId, name, content);
    this.showTodo(editableNoteData);
  };

  showTodo(todoData): void {
    this.view.render(todoData);
  }

  static start = (): void => {
    const todoModel = new TodoModel();

    const targetElement = document.getElementById("notes");
    const todoView = new TodoView(targetElement);

    const controller = new TodoController(todoModel, todoView);

    controller.initialize();
  };
}
