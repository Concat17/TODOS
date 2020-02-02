import TodoModel from "./Model";
import TodoView from "./View";

const TodoController = function TodoController(todoView, todoModel) {
  this.todoView = todoView;
  this.todoModel = todoModel;
};

TodoController.prototype.initialize = function initialize() {
  this.todoView.onClickGetTodo = this.onClickGetTodo.bind(this);
  this.todoView.onMouseDown = this.onMouseDown.bind(this);
  this.todoModel.addNote();
  let note = this.todoModel.getNoteData(0);
  this.showTodo(note);
  //this.todoModel.getTodoData(this.showTodo.bind(this));
};

TodoController.prototype.onClickGetTodo = function onClickGetTodo(e) {
  let a = e.currentTarget;
  let f = parseInt(a.dataset.index, 10);
  let note = this.todoModel.getNoteData(0);
  this.todoView.render(note);
  //this.todoModel.getTodoData(this.showTodo.bind(this));
};

TodoController.prototype.onMouseDown = function onMouseDown(e) {
  this.todoView.MoveNote(e);
};

TodoController.prototype.showTodo = function showTodo(todoData): void {
  this.todoView.render(todoData);
};

export function start() {
  const todoModel = new TodoModel();

  const targetElement = document.getElementById("listOfPenguins");
  const todoView = new TodoView(targetElement);

  const controller = new TodoController(todoView, todoModel);

  controller.initialize();
}

export default start;
