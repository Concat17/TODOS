import { TodoModel } from "./Model.js";
import { TodoView } from "./View.js";

var TodoController = function TodoController(todoView, todoModel) {
  this.todoView = todoView;
  this.todoModel = todoModel;
};

TodoController.prototype.initialize = function initialize() {
  this.todoView.onClickGetTodo = this.onClickGetTodo.bind(this);
  this.todoView.onMouseDown = this.onMouseDown.bind(this);
  this.todoModel.getTodo(this.showTodo.bind(this));
};

TodoController.prototype.onClickGetTodo = function onClickGetTodo(e) {
  this.todoModel.getTodo(this.showTodo.bind(this));
};

TodoController.prototype.onMouseDown = function onMouseDown(e) {
  let foo = e.clientX;
  this.todoView.MoveNote(e);
};

TodoController.prototype.showTodo = function showTodo(todoData) {
  this.todoView.render(todoData);
};

export function start() {
  var todoModel = new TodoModel();

  var targetElement = document.getElementById("listOfPenguins");
  var todoView = new TodoView(targetElement);

  var controller = new TodoController(todoView, todoModel);

  controller.initialize();
}

// controller.onClickGetTodo({
//   currentTarget: { dataset: { penguinIndex: 0 } }
// });
