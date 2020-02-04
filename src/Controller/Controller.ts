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
    this.model.addNote();
    const note = this.model.getNoteData(0);
    this.showTodo(note);
  }
  onMouseDown(e: MouseEvent): void {
    this.view.MoveNote(e);
  }

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
