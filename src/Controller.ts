import TodoModel from './Model/TodoModel';
import TodoView from './View';

const TodoController = function TodoController(todoView, todoModel) {
  this.todoView = todoView;
  this.todoModel = todoModel;
};

TodoController.prototype.initialize = function initialize() {
  // this.todoView.onClickGetTodo = this.onClickGetTodo.bind(this);
  this.todoView.onMouseDown = this.onMouseDown.bind(this);
  this.todoModel.addNote();
  const note = this.todoModel.getNoteData(0);
  this.showTodo(note);
  // this.todoModel.getTodoData(this.showTodo.bind(this));
};

// TodoController.prototype.onClickGetTodo = function onClickGetTodo(e) {
//   //this.todoView.render(note);
//   //this.todoModel.getTodoData(this.showTodo.bind(this));
// };

TodoController.prototype.onMouseDown = function onMouseDown(e) {
  this.todoView.MoveNote(e);
};

TodoController.prototype.showTodo = function showTodo(todoData): void {
  this.todoView.render(todoData);
};

export function start() {
  const todoModel = new TodoModel();

  const targetElement = document.getElementById("notes");
  const todoView = new TodoView(targetElement);

  const controller = new TodoController(todoView, todoModel);

  controller.initialize();
}

export default start;
